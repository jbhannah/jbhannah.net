/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HeaderQuery
// ====================================================

export interface HeaderQuery_site_siteMetadata {
  title: string | null
}

export interface HeaderQuery_site {
  siteMetadata: HeaderQuery_site_siteMetadata | null
}

export interface HeaderQuery_file_childImageSharp_fixed {
  src: string
  srcSet: string
  srcSetWebp: string | null
}

export interface HeaderQuery_file_childImageSharp {
  fixed: HeaderQuery_file_childImageSharp_fixed | null
}

export interface HeaderQuery_file {
  childImageSharp: HeaderQuery_file_childImageSharp | null
}

export interface HeaderQuery {
  site: HeaderQuery_site | null
  file: HeaderQuery_file | null
}
