/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SocialNavQuery
// ====================================================

export interface SocialNavQuery_site_siteMetadata_socialLinks {
  key: string | null;
  service: string | null;
  link: string | null;
  name: string | null;
}

export interface SocialNavQuery_site_siteMetadata {
  socialLinks: (SocialNavQuery_site_siteMetadata_socialLinks | null)[] | null;
}

export interface SocialNavQuery_site {
  siteMetadata: SocialNavQuery_site_siteMetadata | null;
}

export interface SocialNavQuery {
  site: SocialNavQuery_site | null;
}
