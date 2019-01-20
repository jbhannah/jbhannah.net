import { graphql } from "gatsby"
import React from "react"
import Article from "../components/Article"
import Layout from "../components/Layout"

const Template = ({ data }) => (
  <Layout>
    <Article data={data} />
  </Layout>
)

export default Template

export const query = graphql`
  query ArticlesQuery($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        date
        link
      }
      content: html
      timeToRead
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
