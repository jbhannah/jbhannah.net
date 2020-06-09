/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArticleQuery
// ====================================================

export interface ArticleQuery_article_fields {
  slug: string | null
  title: string | null
}

export interface ArticleQuery_article_frontmatter {
  date: any | null
  link: string | null
}

export interface ArticleQuery_article {
  fields: ArticleQuery_article_fields | null
  frontmatter: ArticleQuery_article_frontmatter | null
  excerpt: string | null
  htmlAst: any | null
  timeToRead: number | null
}

export interface ArticleQuery_site_siteMetadata_name {
  first: string | null
  last: string | null
}

export interface ArticleQuery_site_siteMetadata {
  siteUrl: string | null
  title: string | null
  username: string | null
  name: ArticleQuery_site_siteMetadata_name | null
}

export interface ArticleQuery_site {
  siteMetadata: ArticleQuery_site_siteMetadata | null
}

export interface ArticleQuery {
  article: ArticleQuery_article | null
  site: ArticleQuery_site | null
}

export interface ArticleQueryVariables {
  slug?: string | null
}
