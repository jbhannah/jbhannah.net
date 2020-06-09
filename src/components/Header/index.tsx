import { InterpolationWithTheme } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { contentWidth, headerWidth, hoverRadius, mq } from "../../utils/styles"
import Heading from "../Heading"
import Link from "../Link"
import { SocialNav } from "../SocialNav"
import { HeaderQuery } from "./__generated__/HeaderQuery"

const headerCSS: InterpolationWithTheme<any> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "0 auto",
  maxWidth: contentWidth,
  padding: "0 1rem",
  width: "100%",
  [mq.lg]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 0,
    textAlign: "center",
    width: headerWidth,
  },
  [mq.xl]: {
    marginLeft: `-${headerWidth}`,
  },
}

const titleCSS: InterpolationWithTheme<any> = {
  fontSize: "1.15rem",
  [mq.sm]: {
    fontSize: "1.25rem",
  },
}

const avatarCSS: InterpolationWithTheme<any> = {
  display: "none",
  [mq.lg]: {
    display: "block",
    width: "100%",
    marginBottom: "0.79rem",
    "source, img": {
      ...hoverRadius,
      display: "block",
      margin: 0,
    },
  },
}

export const Header = () => {
  const {
    site: {
      siteMetadata: { title },
    },
    file: {
      childImageSharp: { fixed: avatar },
    },
  } = useStaticQuery<HeaderQuery>(query)

  return (
    <header css={headerCSS}>
      <Heading level="h1" css={titleCSS}>
        <Link href="/" css={{ display: "block" }}>
          <picture css={avatarCSS}>
            <source type="image/webp" srcSet={avatar.srcSetWebp} />
            <source type="image/png" srcSet={avatar.srcSet} />
            <img src={avatar.src} alt={title} />
          </picture>
          {title}
        </Link>
      </Heading>
      <SocialNav />
    </header>
  )
}

const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
      }
    }
    file(sourceInstanceName: { eq: "images" }, name: { eq: "avatar" }) {
      childImageSharp {
        fixed(width: 160) {
          src
          srcSet
          srcSetWebp
        }
      }
    }
  }
`
