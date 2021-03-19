import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { mq } from "../../utils/styles"
import { SocialLink } from "./link"

const Nav = styled.nav({
  marginTop: "2.37rem",
  [mq.lg]: {
    marginTop: 0,
  },
})

const UL = styled.ul({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  listStyleType: "none",
  margin: 0,
  [mq.lg]: {
    justifyContent: "center",
  },
})

export const SocialNav = () => {
  const {
    site: {
      siteMetadata: { socialLinks },
    },
  } = useStaticQuery(query)

  return (
    <Nav>
      <UL>
        {socialLinks.map((l) => (
          <SocialLink {...l} />
        ))}
      </UL>
    </Nav>
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
