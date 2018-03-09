import React from 'react'
// import Link from 'gatsby-link'

import Article from '../components/Article'

const IndexPage = ({ data }) => (
  <div>
    <h2>Recent Articles</h2>
    <ul>
      {data.articles.edges.map(({ node: { id, childMarkdownRemark } }) => (
        <li key={id}>
          <Article data={childMarkdownRemark} />
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
            frontmatter {
              title
              date
            }
            content: excerpt
            timeToRead
          }
        }
      }
    }
  }
`
