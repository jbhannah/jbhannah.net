---
date: 2020-06-03T05:57:54.556Z
---

# Negating ActiveRecord Scopes

Here's a neat trick in Rails to use the plumbing of ActiveRecord to keep your
code DRY and maintainable. Say you have a scope in an ActiveRecord model with
an `expires_at` column, to find records that are still active:

```ruby
class Foobar < ApplicationRecord
  scope :active, -> { where(expires_at: Time.zone.now..) }
end
```

You also want to be able to find expired records to be able to clean them out of
the database. So you may write an inverse scope[^1]:

```ruby
class Foobar < ApplicationRecord
  scope :active,  -> { where(expires_at: Time.zone.now..) }
  scope :expired, -> { where(expires_at: ...Time.zone.now) }
end
```

But[^2] what if you want "expired" records to still be usable for a brief
period to allow them to be refreshed and extended? Both scopes will need to
be changed to reflect the new ranges, or you could use a class-level utility
method that just returns `ruby›30.minutes.ago` or whatever buffer you want to
use, and call it from both scopes. Even then, if you later have need for
another opposing pair of scopes, you'll still have to keep both of those
scopes mirrored manually as well.

Or you can leverage Arel, the magic that underlies ActiveRecord itself[^3]:

```ruby
class ApplicationRecord < ActiveRecord::Base
  scope :not, ->(scope) { where(scope.arel.constraints.reduce(:and).not) }
end
```

Your `expired` scope is now much simpler and more clearly logically coupled to
the `active` scope[^4]:

```ruby
class Foobar < ApplicationRecord
  scope :active, -> { where(expires_at: 30.minutes.ago..) }
  scope :expired, -> { self.not(active) }
end
```

and any other opposing pairs of scopes in your application can use the same
`not` meta-scope in the same way.

## What's happening under the hood

`ruby›scope.arel.constraints` gets the Arel representation of the scope and
extracts the constraints (i.e. the `where` clause). This gives an array of
`ruby›Arel::Nodes`, one for each `where` statement the generated query;
`ruby›.reduce(:and)` combines them all into a single Arel statement that can
be negated with `ruby›.not`. This Arel statement can be passed back to
ActiveRecord's `where` method, which turns the SQL for the original `active`
scope:

```sql
SELECT "foobars".*
FROM "foobars"
WHERE "foobars"."expires_at" >= "2020-06-03 05:44:31.319993"
LIMIT 11
```

into this for the `expired` scope:

```sql
SELECT "foobars".*
FROM "foobars"
WHERE NOT ("foobars"."expires_at" >= "2020-06-03 05:44:31.319993")
LIMIT 11
```

and any changes made to the original `active` scope will be used in the inverse
scope.

[^1]:
    Yes, ActiveRecord understands the `ruby›..` (inclusive range) and `ruby›...`
    (range exclusive of the end value) operators for comparison queries.

[^2]: This is an entirely contrived example. Don't take it too seriously.
[^3]: Credit to Matthew Parker for the [2013 version][vmw] of this snippet.
[^4]: `ruby›self.not` is required to distinguish the method from the Ruby keyword.

[vmw]: https://tanzu.vmware.com/content/blog/logically-negating-an-activerecord-scope
