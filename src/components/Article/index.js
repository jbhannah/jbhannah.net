import React from "react"
import Helmet from "react-helmet"
import { DateTime } from "luxon"

import styles from "./styles.module.css"
import MarginFix from "../MarginFix"

function localDateFromDateTime(date) {
  return DateTime.fromISO(date)
    .setZone("America/Phoenix")
    .toLocaleString(DateTime.DATE_HUGE)
}

const Article = ({ data, list }) => {
  const { markdownRemark: mkdn, site } = data
  const TitleHeader = list ? "h2" : "h1"
  let title

  if (mkdn.frontmatter.link) {
    title = <a href={mkdn.frontmatter.link}>{mkdn.frontmatter.title}</a>
  } else if (list) {
    title = <a href={"/" + mkdn.fields.slug}>{mkdn.frontmatter.title}</a>
  } else {
    title = mkdn.frontmatter.title
  }

  return (
    <article>
      {list || (
        <Helmet
          title={mkdn.frontmatter.title + " – " + site.siteMetadata.title}
        />
      )}
      <header>
        <TitleHeader>{title}</TitleHeader>
        <p className={styles.metadata}>
          <time dateTime={mkdn.frontmatter.date}>
            {localDateFromDateTime(mkdn.frontmatter.date)}
          </time>
          {" — "}
          {mkdn.timeToRead} minute read
        </p>
        {list && <MarginFix />}
      </header>
      <section dangerouslySetInnerHTML={{ __html: mkdn.content }} />
      {(mkdn.frontmatter.link || list) && (
        <footer className={styles.footer}>
          <a href={"/" + mkdn.fields.slug}>
            {mkdn.frontmatter.link ? "Permalink" : "Read More…"}
          </a>
        </footer>
      )}
    </article>
  )
}

export default Article
