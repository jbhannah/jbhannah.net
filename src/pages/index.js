import { graphql } from "gatsby"
import React from "react"
import Article from "../components/Article"
import Heading from "../components/Heading"
import Layout from "../components/Layout"

const IndexPage = ({ data }) => (
  <Layout>
    <Heading level="h1">Recent Articles</Heading>
    <ul css={{ listStyleType: "none", margin: 0 }}>
      {data.articles.edges.map(({ node: { id, childMarkdownRemark } }) => (
        <li key={id}>
          <Article data={{ markdownRemark: childMarkdownRemark }} list={true} />
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    articles: allFile(
      filter: {
        internal: { mediaType: { eq: "text/markdown" } }
        sourceInstanceName: { eq: "articles" }
      }
      sort: { fields: [name], order: DESC }
    ) {
      edges {
        node {
          id
          childMarkdownRemark {
            ...ArticleInformation
          }
        }
      }
    }
  }
`
