import { graphql } from "gatsby"
import { DateTime } from "luxon"
import * as React from "react"
import excerpt from "../../utils/excerpt"
import { rhythm } from "../../utils/typography"
import { Heading } from "../Heading"
import { Link } from "../Link"
import { MarginFix } from "../MarginFix"
import { Markdown } from "../Markdown"
import { ArticleInformation } from "./__generated__/ArticleInformation"

const localDateFromDateTime = (date: string) =>
  DateTime.fromISO(date)
    .setZone("America/Phoenix")
    .toLocaleString(DateTime.DATE_HUGE)

const headingCSS = { marginBottom: rhythm(1 / 2) }
const metadataCSS = { fontSize: rhythm(1 / 2), ...headingCSS }

const footerCSS = { marginTop: rhythm(1) }

interface ArticleProps {
  list?: boolean
  article: ArticleInformation
}

export const Article: React.FunctionComponent<ArticleProps> = ({
  list,
  article,
}) => {
  const { fields, frontmatter, timeToRead } = article
  const content = list ? excerpt(article) : article.htmlAst
  let title

  if (frontmatter.link) {
    title = <Link href={frontmatter.link}>{fields.title}</Link>
  } else if (list) {
    title = <Link href={`${fields.slug}`}>{fields.title}</Link>
  } else {
    title = fields.title
  }

  return (
    <article>
      <header>
        <Heading css={headingCSS} level={list ? "h2" : "h1"}>
          {title}
        </Heading>
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
          <Link href={`${fields.slug}`}>
            {frontmatter.link ? "Permalink" : "Read More…"}
          </Link>
        </footer>
      )}
    </article>
  )
}

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
