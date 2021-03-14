/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IGatsbyImageData } from "gatsby-plugin-image";

// ====================================================
// GraphQL query operation: LayoutQuery
// ====================================================

export interface LayoutQuery_site_siteMetadata {
  siteUrl: string | null;
  title: string | null;
  description: string | null;
  twitterCreator: string | null;
}

export interface LayoutQuery_site {
  siteMetadata: LayoutQuery_site_siteMetadata | null;
}

export interface LayoutQuery_imageSharp_fixed {
  src: string;
}

export interface LayoutQuery_imageSharp {
  fixed: LayoutQuery_imageSharp_fixed | null;
}

export interface LayoutQuery_file_childImageSharp {
  gatsbyImageData: IGatsbyImageData | null;
}

export interface LayoutQuery_file {
  childImageSharp: LayoutQuery_file_childImageSharp | null;
}

export interface LayoutQuery {
  site: LayoutQuery_site | null;
  file: LayoutQuery_file | null;
  imageSharp: LayoutQuery_imageSharp | null;
}
