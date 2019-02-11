import { graphql } from "gatsby"
import React from "react"
import Helmet from "react-helmet"
import Article from "../components/Article"
import Layout from "../components/Layout"

const Template = ({ data }) => {
  const {
    article: { frontmatter },
    site: { siteMetadata },
  } = data

  return (
    <Layout>
      <Helmet title={`${frontmatter.title} – ${siteMetadata.title}`} />
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
        title
      }
    }
  }
`
