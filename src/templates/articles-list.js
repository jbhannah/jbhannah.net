import { graphql } from "gatsby"
import React from "react"
import Article from "../components/Article"
import Heading from "../components/Heading"
import Layout from "../components/Layout"
import Link from "../components/Link"

const ArticlesList = ({ data, pageContext: { page, numPages } }) => (
  <Layout>
    <Heading level="h1">Recent Articles</Heading>
    <ul css={{ listStyleType: "none", margin: 0 }}>
      {data.articles.edges.map(({ node: { id, childMarkdownRemark } }) => (
        <li key={id}>
          <Article data={{ markdownRemark: childMarkdownRemark }} list={true} />
        </li>
      ))}
    </ul>
    {numPages > 1 && (
      <footer>
        <ul
          css={{
            display: "block",
            listStyleType: "none",
            margin: 0,
            li: {
              display: "inline-block",
              marginBottom: 0,
              marginRight: "1rem",
              a: {
                backgroundImage: "none",
              },
            },
          }}
        >
          <li>{page > 1 ? <Link to="/">«</Link> : "«"}</li>
          {Array.from({ length: numPages }).map((_, i) => {
            const pg = i + 1
            return (
              <li key={`paginate-${i}`}>
                {page === pg ? (
                  pg
                ) : (
                  <Link to={i === 0 ? "/" : `/page/${pg}`}>{pg}</Link>
                )}
              </li>
            )
          })}
          <li>
            {page < numPages ? <Link to={`/page/${numPages}`}>»</Link> : "»"}
          </li>
        </ul>
      </footer>
    )}
  </Layout>
)

export default ArticlesList

export const query = graphql`
  query ArticlesQuery($skip: Int!, $limit: Int!) {
    articles: allFile(
      filter: {
        internal: { mediaType: { eq: "text/markdown" } }
        sourceInstanceName: { eq: "articles" }
      }
      sort: { fields: [name], order: DESC }
      limit: $limit
      skip: $skip
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
