/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HeaderQuery
// ====================================================

export interface HeaderQuery_site_siteMetadata {
  title: string | null;
}

export interface HeaderQuery_site {
  siteMetadata: HeaderQuery_site_siteMetadata | null;
}

export interface HeaderQuery_imageSharp_fixed {
  src: string;
  srcSet: string;
  srcSetWebp: string | null;
}

export interface HeaderQuery_imageSharp {
  fixed: HeaderQuery_imageSharp_fixed | null;
}

export interface HeaderQuery {
  site: HeaderQuery_site | null;
  imageSharp: HeaderQuery_imageSharp | null;
}
