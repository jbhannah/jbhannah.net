/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArticlesQuery
// ====================================================

export interface ArticlesQuery_articles_edges_node_fields {
  slug: string | null;
  title: string | null;
}

export interface ArticlesQuery_articles_edges_node_frontmatter {
  date: any | null;
  link: string | null;
}

export interface ArticlesQuery_articles_edges_node {
  id: string;
  fields: ArticlesQuery_articles_edges_node_fields | null;
  frontmatter: ArticlesQuery_articles_edges_node_frontmatter | null;
  excerpt: string | null;
  htmlAst: any | null;
  timeToRead: number | null;
}

export interface ArticlesQuery_articles_edges {
  node: ArticlesQuery_articles_edges_node;
}

export interface ArticlesQuery_articles {
  edges: ArticlesQuery_articles_edges[];
}

export interface ArticlesQuery {
  articles: ArticlesQuery_articles;
}

export interface ArticlesQueryVariables {
  skip: number;
  limit: number;
}
