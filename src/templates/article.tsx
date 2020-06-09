import { graphql } from "gatsby"
import * as React from "react"
import { Helmet } from "react-helmet"
import Article from "../components/Article"
import { Layout } from "../components/Layout"

const Template = ({ data }) => {
  const {
    article: {
      fields: { slug, title },
      excerpt,
    },
    site: {
      siteMetadata: { siteUrl, title: siteTitle, username, name },
    },
  } = data

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
        title
        username
        name {
          first
          last
        }
      }
    }
  }
`
