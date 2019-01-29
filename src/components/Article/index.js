import { graphql } from "gatsby"
import { DateTime } from "luxon"
import React from "react"
import Helmet from "react-helmet"
import excerpt from "../../utils/excerpt"
import Heading from "../Heading"
import Link from "../Link"
import MarginFix from "../MarginFix"
import Markdown from "../Markdown"

const localDateFromDateTime = date =>
  DateTime.fromISO(date)
    .setZone("America/Phoenix")
    .toLocaleString(DateTime.DATE_HUGE)

const Article = ({ data, list }) => {
  const { markdownRemark: mkdn, site } = data
  let title,
    content = mkdn.htmlAst

  if (mkdn.frontmatter.link) {
    title = <Link href={mkdn.frontmatter.link}>{mkdn.frontmatter.title}</Link>
  } else if (list) {
    title = <Link to={"/" + mkdn.fields.slug}>{mkdn.frontmatter.title}</Link>
    content = excerpt(mkdn)
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
      <Markdown htmlAst={content} root="section" />
      {(mkdn.frontmatter.link || list) && (
        <footer css={{ marginTop: "1.58rem" }}>
          <Link to={"/" + mkdn.fields.slug}>
            {mkdn.frontmatter.link ? "Permalink" : "Read More…"}
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
    }
    frontmatter {
      title
      date
      link
    }
    htmlAst
    timeToRead
  }
`
