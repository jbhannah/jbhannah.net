import { InterpolationWithTheme } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { mq } from "../../utils/styles"
import { SocialLink } from "./link"

const socialNavCSS: InterpolationWithTheme<any> = {
  marginTop: "2.37rem",
  [mq.lg]: {
    marginTop: 0,
  },
}

const socialNavUlCSS: InterpolationWithTheme<any> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  listStyleType: "none",
  margin: 0,
  [mq.lg]: {
    justifyContent: "center",
  },
}

export const SocialNav = () => {
  const {
    site: {
      siteMetadata: { socialLinks },
    },
  } = useStaticQuery(query)

  return (
    <nav css={socialNavCSS}>
      <ul css={socialNavUlCSS}>
        {socialLinks.map((l) => (
          <SocialLink {...l} />
        ))}
      </ul>
    </nav>
  )
}

const query = graphql`
  query SocialNavQuery {
    site {
      siteMetadata {
        socialLinks {
          key: service
          service
          link
          name
        }
      }
    }
  }
`
