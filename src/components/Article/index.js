import { DateTime } from "luxon"
import React from "react"
import Helmet from "react-helmet"
import Heading from "../Heading"
import MarginFix from "../MarginFix"
import Markdown from "../Markdown"

function localDateFromDateTime(date) {
  return DateTime.fromISO(date)
    .setZone("America/Phoenix")
    .toLocaleString(DateTime.DATE_HUGE)
}

const Article = ({ data, list }) => {
  const { markdownRemark: mkdn, site } = data
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
        <Heading level={list ? "h2" : "h1"}>{title}</Heading>
        <p css={{ fontSize: "0.75rem", marginBottom: "0.79rem" }}>
          <time dateTime={mkdn.frontmatter.date}>
            {localDateFromDateTime(mkdn.frontmatter.date)}
          </time>
          {" — "}
          {mkdn.timeToRead} minute read
        </p>
        {list && <MarginFix />}
      </header>
      <Markdown htmlAst={mkdn.content} />
      {(mkdn.frontmatter.link || list) && (
        <footer css={{ marginTop: "1.58rem" }}>
          <a href={"/" + mkdn.fields.slug}>
            {mkdn.frontmatter.link ? "Permalink" : "Read More…"}
          </a>
        </footer>
      )}
    </article>
  )
}

export default Article
