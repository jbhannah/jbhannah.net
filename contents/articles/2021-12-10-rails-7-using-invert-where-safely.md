---
date: 2021-12-10T19:52:29.485Z
---

# Using Rails 7.0's #invert_where Safely

Rails 7.0 introduces the
[`ActiveRecord::QueryMethods#invert_where`][invert_where] method on ActiveRecord
query chains, and at a glance this looks like a more elegant solution to the
problem I've addressed previously of [negating ActiveRecord scopes using
Arel][arel]. But it has one distinct and dangerous difference: in its current
implementation, it [inverts _all_ preceding conditions in the query][iss],
including those contained within scopes — including the default scope of a
model. The consequence of this is that chaining scopes, where just one scope or
condition includes `#invert_where`, will give [different results for different
orderings of the chain][example]. There is, however, a way to use it safely
while also improving my previous `.not` scope implementation (and fixing a minor
bug with it that I discovered while working on the example repo for this post).

## Why is `#invert_where` dangerous?

In isolation, it's not, and it does what you'd expect it to[^1]:

```ruby
Foobar.where(published: true)
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."published" = 1

Foobar.where(published: true).invert_where
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."published" != 1
```

You can even use it in scopes to similar effect:

```ruby
class Foobar < ApplicationRecord
  scope :published, -> { where(published: true) }
  scope :draft,     -> { published.invert_where }

  scope :active, -> { where(expires_at: Time.zone.now..) }
  scope :expired, -> { active.invert_where }
end

Foobar.published
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."published" = 1

Foobar.draft
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."published" != 1
```

And if you put it before any other conditions or scopes, it continues to behave
as expected:

```ruby
Foobar.published.active # This is published && active…
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."published" = 1 AND "foobars"."expires_at" >= '2021-12-10 04:21:48.044576'

Foobar.draft.active # …and this is !published && active. So far, so good!
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."published" != 1 AND "foobars"."expires_at" >= '2021-12-10 18:37:29.124653'
```

But as I said, `#invert_where` inverts _all_ preceding conditions in the query
chain, so reversing the chain produces different results:

```ruby
Foobar.active.published # This is still active && published…
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."expires_at" >= '2021-12-10 18:40:29.336682' AND "foobars"."published" = 1

Foobar.active.draft # …but this becomes !(active && published)!
# SELECT "foobars".* FROM "foobars" WHERE NOT ("foobars"."expires_at" >= '2021-12-10 18:40:58.226845' AND "foobars"."published" = 1)
```

This still occurs if `.active` is your default scope, further obfuscating the
issue:

```ruby
class Foobar < ApplicationRecord
  # …

  default_scope { active }
end

Foobar.published
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."expires_at" >= '2021-12-10 18:40:29.336682' AND "foobars"."published" = 1

Foobar.draft
# SELECT "foobars".* FROM "foobars" WHERE NOT ("foobars"."expires_at" >= '2021-12-10 18:40:58.226845' AND "foobars"."published" = 1)
```

## How can we use it safely?

Remember that when applied to a single condition, `#invert_where` does what you
expect it to. So if you can isolate _just_ the condition that you want to
invert, it won't have the same side effects on other parts of the query —
regardless of the query chain's order. My proposed implementation of this is:

```ruby
class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # highlight-next-line
  scope :inverse_of, ->(scope) { self.and(klass.send(scope).invert_where) }
end

class Foobar < ApplicationRecord
  # …

  scope :draft,   -> { inverse_of(:published) }
  scope :expired, -> { inverse_of(:active) }
end
```

Let's break this down: first, instead of passing the query chain itself into the
negating scope as I did in my previous solution, the scope name is passed as a
symbol and called on the model class (available as `klass` within an
ActiveRecord query chain) directly with `Kernel#send`, isolating the conditions
of that scope. Next, now that we have those conditions in isolation, we can
safely `#invert_where` those conditions without affecting the rest of the query.
And finally, calling `.and` on the outer query chain lets us append the inverted
scope to it as a distinct set of conditions. All combinations of `.active` and
`.expired`, and `.published` and `.draft`, now behave as expected:

```ruby
Foobar.published.active # published && active
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."published" = 1 AND "foobars"."expires_at" >= '2021-12-10 19:02:16.322539'

Foobar.active.published # active && published
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."expires_at" >= '2021-12-10 18:40:29.336682' AND "foobars"."published" = 1

Foobar.draft.active # !published && active
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."published" != 1 AND "foobars"."expires_at" >= '2021-12-10 18:37:29.124653'

Foobar.active.draft # active && !published
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."expires_at" >= '2021-12-10 19:03:35.161283' AND "foobars"."published" != 1
```

## What's wrong with my [old Arel solution][arel]?

For the most part, nothing, if you're using it without any other query
conditions. If you chain it with other scopes or conditions, though, an odd
redundant condition appears:

```ruby
class ApplicationRecord < ActiveRecord::Base
  # …

  scope :not, ->(scope) { where(scope.arel.constraints.reduce(:and).not) }
end

class Foobar < ApplicationRecord
  # …

  scope :old_draft, -> { self.not(published) }
end

Foobar.active.old_draft # active && !(active && published) ???
# SELECT "foobars".* FROM "foobars" WHERE "foobars"."expires_at" >= '2021-12-10 18:37:26.139329' AND NOT ("foobars"."expires_at" >= '2021-12-10 18:37:26.139329' AND "foobars"."published" = 1)
```

Instead of inverting just the `.published` scope, the `.not` scope receives the
entire existing query chain as a parameter, wrapping the entire thing _plus_ the
condition we meant to invert in a `NOT` statement and appending it all to the
query chain. Because `a && !(a && b)` can be rewritten (using boolean logic) as
`(a && !a) || (a && !b)` — and therefore as `a && !b` — this still produces the
desired result of querying for `active && !published`, but it's neither very
clean nor elegant, and for more complex queries could behave unexpectedly and/or
have an impact on performance.

This implementation of `.not` is also more unwieldy and obscure than my new
`.inverse_of` scope, both in passing the query chain itself as a parameter, and
in delving into the underlying Arel structures that are less thoroughly
documented and intended to remain under the hood in the vast majority of
applications. By both isolating the specific conditions to invert, and by
leveraging the new `#invert_where` method, we can write a much more idiomatic
way to negate a given scope, which generates cleaner SQL than the old solution,
while also avoiding the pitfalls of the current implementation of
`#invert_where`; and even if that implementation changes in the future, I don't
expect it to impact the behavior and usefulness of being able to define a scope
as the explicit opposite of another scope.

[^1]:
    Note that it inverts the `=` condition itself, not merely wrapping it (as
    my previous solution did) in a `NOT` clause.

[invert_where]: https://edgeapi.rubyonrails.org/classes/ActiveRecord/QueryMethods.html#method-i-invert_where
[arel]: https://jbhannah.net/articles/negating-activerecord-scopes
[iss]: https://github.com/rails/rails/pull/42118
[example]: https://github.com/jbhannah/invert_where_test
