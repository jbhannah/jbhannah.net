import React from 'react'
import { DateTime } from 'luxon'

import styles from './styles.module.css'
import MarginFix from '../MarginFix'

function localDateFromDateTime(date) {
  return DateTime.fromISO(date).setZone('America/Phoenix').toLocaleString(DateTime.DATE_HUGE)
}

const Article = ({ data, list }) => {
  const TitleHeader = list ? 'h2' : 'h1'
  let title

  if (data.frontmatter.link) {
    title = <a href={data.frontmatter.link}>{data.frontmatter.title}</a>
  } else if (list) {
    title = <a href={'/' + data.fields.slug}>{data.frontmatter.title}</a>
  } else {
    title = data.frontmatter.title
  }

  return (
    <article>
      <header>
        <TitleHeader>{title}</TitleHeader>
        <p className={styles.metadata}>
          <time dateTime={data.frontmatter.date}>
            {localDateFromDateTime(data.frontmatter.date)}
          </time>
          {' — '}
          {data.timeToRead} minute read
        </p>
        { list && <MarginFix /> }
      </header>
      <section dangerouslySetInnerHTML={{ __html: data.content }} />
      {(data.frontmatter.link || list) && (
        <footer className={styles.footer}>
          <a href={'/' + data.fields.slug}>{ data.frontmatter.link ? 'Permalink' : 'Read More…' }</a>
        </footer>
      )}
    </article>
  )
}

export default Article
