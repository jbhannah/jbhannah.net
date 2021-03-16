import { graphql } from "gatsby"
import * as React from "react"
import { Helmet } from "react-helmet"
import { Article } from "../components/Article"
import { Layout } from "../components/Layout"
import { ArticleQuery } from "./__generated__/ArticleQuery"

interface TemplateProps {
  data: ArticleQuery
}

const Template: React.FunctionComponent<TemplateProps> = ({ data }) => {
  const {
    article: {
      fields: { slug, title },
      excerpt,
    },
    site: {
      siteMetadata: { siteUrl, username, name, gender, pronouns },
    },
  } = data

  const fullname = `${name.first} ${name.mi}. ${name.last}`
  const siteTitle = `${fullname} (${pronouns.join("/")})`

  return (
    <Layout>
      <Helmet>
        <title>
          {title} - {siteTitle}
        </title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}${slug}`} />
        <meta property="og:article:author:first_name" content={name.first} />
        <meta property="og:article:author:last_name" content={name.last} />
        <meta property="og:article:author:username" content={username} />
        <meta property="og:article:author:gender" content={gender} />
        <meta property="twitter:card" content="summary" />
      </Helmet>
      <Article {...data} />
    </Layout>
  )
}

export default Template

export const query = graphql`
  query ArticleQuery($slug: String) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...ArticleInformation
    }
    site {
      siteMetadata {
        siteUrl
        username
        name {
          first
          mi
          last
        }
        gender
        pronouns
      }
    }
  }
`
