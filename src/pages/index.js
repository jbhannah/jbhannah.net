import { graphql } from "gatsby"
import React from "react"
import Article from "../components/Article"
import Layout from "../components/Layout"
import styles from "./index.module.css"

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Recent Articles</h1>
    <ul className={styles.articleList}>
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
            fields {
              slug
            }
            frontmatter {
              title
              date
              link
            }
            content: excerpt
            timeToRead
          }
        }
      }
    }
  }
`
