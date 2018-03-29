import React from 'react'

import Article from '../components/Article'

const Template = ({ data }) => (
  <Article data={data} />
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
