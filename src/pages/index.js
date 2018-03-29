import React from 'react'
// import Link from 'gatsby-link'

import styles from './index.module.css'
import Article from '../components/Article'

const IndexPage = ({ data }) => (
  <div>
    <h1>Recent Articles</h1>
    <ul className={styles.articleList}>
      {data.articles.edges.map(({ node: { id, childMarkdownRemark } }) => (
        <li key={id}>
          <Article data={{ markdownRemark: childMarkdownRemark }} list={true} />
        </li>
      ))}
    </ul>
  </div>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    articles: allFile(filter: { internal: { mediaType: { eq: "text/markdown" } }, sourceInstanceName: { eq: "articles" } }, sort: { fields: [name], order: DESC }) {
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
