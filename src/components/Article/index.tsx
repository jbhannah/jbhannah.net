import styled, { CSSObject } from "@emotion/styled"
import { graphql } from "gatsby"
import { DateTime } from "luxon"
import * as React from "react"
import excerpt from "../../utils/excerpt"
import { rhythm } from "../../utils/typography"
import { Heading as _Heading } from "../Heading"
import { Link } from "../Link"
import { MarginFix } from "../MarginFix"
import { Markdown } from "../Markdown"
import { ArticleInformation } from "./__generated__/ArticleInformation"

const localDateFromDateTime = (date: string) =>
  DateTime.fromISO(date)
    .setZone("America/Phoenix")
    .toLocaleString(DateTime.DATE_HUGE)

const headingCSS: CSSObject = { marginBottom: rhythm(1 / 2) }

const Heading = styled(_Heading)(headingCSS)
const Metadata = styled.p({ fontSize: rhythm(1 / 2), ...headingCSS })
const Footer = styled.footer({ marginTop: rhythm(1) })

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
        <Heading level={list ? "h2" : "h1"}>{title}</Heading>
        <Metadata>
          <time dateTime={frontmatter.date}>
            {localDateFromDateTime(frontmatter.date)}
          </time>
          {" — "}
          {timeToRead} minute read
        </Metadata>
        {list && <MarginFix />}
      </header>
      <Markdown htmlAst={content} />
      {list && (
        <Footer>
          <Link href={`${fields.slug}`}>
            {frontmatter.link ? "Permalink" : "Read More…"}
          </Link>
        </Footer>
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
