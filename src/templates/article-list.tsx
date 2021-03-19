import styled from "@emotion/styled"
import { graphql } from "gatsby"
import * as React from "react"
import { Article } from "../components/Article"
import { H1 } from "../components/Heading"
import { Layout } from "../components/Layout"
import { Paginator } from "../components/Paginator"
import { ArticlesQuery } from "./__generated__/ArticlesQuery"

interface ArticleListProps {
  data: ArticlesQuery
  pageContext: {
    page: number
    numPages: number
  }
}

const UL = styled.ul({ listStyleType: "none", margin: 0 })

export const ArticleList: React.FunctionComponent<ArticleListProps> = ({
  data,
  pageContext: { page, numPages },
}) => (
  <Layout>
    <H1>Recent Articles</H1>
    <UL>
      {data.articles.edges.map(({ node: { id, ...article } }) => (
        <li key={id}>
          <Article list={true} {...{ article }} />
        </li>
      ))}
    </UL>
    <Paginator base="/" {...{ page, numPages }} />
  </Layout>
)

export default ArticleList

export const query = graphql`
  query ArticlesQuery($skip: Int!, $limit: Int!) {
    articles: allMarkdownRemark(
      filter: {
        frontmatter: { draft: { ne: true } }
        fields: { source: { eq: "articles" } }
      }
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
