import { graphql } from "gatsby"
import React from "react"
import Article from "../components/Article"
import Layout from "../components/Layout"

const Template = ({ data }) => (
  <Layout>
    <Article {...data} />
  </Layout>
)

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
