import React from 'react'
import { DateTime } from 'luxon'

function localDateFromDateTime(date) {
  return DateTime.fromISO(date).setZone('America/Phoenix').toLocaleString(DateTime.DATE_HUGE)
}

const Article = ({ data }) => (
  <article>
    <header>
      <h1>{data.frontmatter.title}</h1>
      <p>
        <time dateTime={data.frontmatter.date}>
          {localDateFromDateTime(data.frontmatter.date)}
        </time>
        {' — '}
        {data.timeToRead} minute read
      </p>
    </header>
    <section>
      {data.content}
    </section>
  </article>
)

export default Article
