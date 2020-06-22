/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArticleInformation
// ====================================================

export interface ArticleInformation_fields {
  slug: string | null;
  title: string | null;
}

export interface ArticleInformation_frontmatter {
  date: any | null;
  link: string | null;
}

export interface ArticleInformation {
  fields: ArticleInformation_fields | null;
  frontmatter: ArticleInformation_frontmatter | null;
  excerpt: string | null;
  htmlAst: any | null;
  listExcerptHtmlAst: any | null;
  timeToRead: number | null;
}
