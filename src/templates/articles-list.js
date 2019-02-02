import { graphql } from "gatsby"
import React from "react"
import Article from "../components/Article"
import Heading from "../components/Heading"
import Layout from "../components/Layout"
import Paginator from "../components/Paginator"

const ArticlesList = ({ data, pageContext: { page, numPages } }) => (
  <Layout>
    <Heading level="h1">Recent Articles</Heading>
    <ul css={{ listStyleType: "none", margin: 0 }}>
      {data.articles.edges.map(({ node: { id, ...article } }) => (
        <li key={id}>
          <Article list={true} {...{ article }} />
        </li>
      ))}
    </ul>
    <Paginator base="/" {...{ page, numPages }} />
  </Layout>
)

export default ArticlesList

export const query = graphql`
  query ArticlesQuery($skip: Int!, $limit: Int!) {
    articles: allMarkdownRemark(
      filter: { fields: { source: { eq: "articles" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          ...ArticleInformation
        }
      }
    }
  }
`
