import { graphql } from "gatsby"
import { DateTime } from "luxon"
import React from "react"
import excerpt from "../../utils/excerpt"
import Heading from "../Heading"
import Link from "../Link"
import MarginFix from "../MarginFix"
import Markdown from "../Markdown"

const localDateFromDateTime = (date) =>
  DateTime.fromISO(date)
    .setZone("America/Phoenix")
    .toLocaleString(DateTime.DATE_HUGE)

const metadataCSS = { fontSize: "0.75rem", marginBottom: "0.79rem" }

const footerCSS = { marginTop: "1.58rem" }

const Article = ({ list, article }) => {
  const { fields, frontmatter, timeToRead } = article
  const content = list ? excerpt(article) : article.htmlAst
  let title

  if (frontmatter.link) {
    title = <Link href={frontmatter.link}>{fields.title}</Link>
  } else if (list) {
    title = <Link href={`/${fields.slug}`}>{fields.title}</Link>
  } else {
    title = fields.title
  }

  return (
    <article>
      <header>
        <Heading level={list ? "h2" : "h1"}>{title}</Heading>
        <p css={metadataCSS}>
          <time dateTime={frontmatter.date}>
            {localDateFromDateTime(frontmatter.date)}
          </time>
          {" — "}
          {timeToRead} minute read
        </p>
        {list && <MarginFix />}
      </header>
      <Markdown htmlAst={content} />
      {list && (
        <footer css={footerCSS}>
          <Link href={`/${fields.slug}`}>
            {frontmatter.link ? "Permalink" : "Read More…"}
          </Link>
        </footer>
      )}
    </article>
  )
}

export default Article

export const query = graphql`
  fragment ArticleInformation on MarkdownRemark {
    fields {
      slug
      title
    }
    frontmatter {
      date
      link
    }
    excerpt
    htmlAst
    timeToRead
  }
`
