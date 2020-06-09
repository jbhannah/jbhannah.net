import { InterpolationWithTheme } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { Helmet } from "react-helmet"
import {
  contentWidth,
  contentWidthColumn,
  headerWidth,
  mq,
} from "../../utils/styles"
import Footer from "../Footer"
import Header from "../Header"
import Global from "./global"
import { LayoutQuery } from "./__generated__/LayoutQuery"

const layoutCSS: InterpolationWithTheme<any> = {
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  maxWidth: `${parseInt(headerWidth) + parseInt(contentWidth)}rem`,
  minHeight: "100vh",
  [mq.lg]: {
    flexFlow: "row wrap",
  },
  [mq.xl]: {
    maxWidth: contentWidth,
  },
}

const mainCSS: InterpolationWithTheme<any> = {
  ...contentWidthColumn,
  flexGrow: 1,
  [mq.lg]: {
    margin: 0,
  },
}

export const Layout: React.FunctionComponent = ({ children }) => {
  const {
    site: {
      siteMetadata: {
        siteUrl,
        title,
        description,
        twitterCreator,
        socialLinks,
      },
    },
    file: {
      childImageSharp: { fixed: avatar },
    },
  } = useStaticQuery<LayoutQuery>(query)

  return (
    <div css={layoutCSS}>
      <Global />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={avatar.src} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:url" content={siteUrl} />
        <meta property="twitter:creator" content={twitterCreator} />
      </Helmet>
      <Header {...{ title, avatar, socialLinks }} />
      <main css={mainCSS}>{children}</main>
      <Footer {...{ title }} />
    </div>
  )
}

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
        twitterCreator
        socialLinks {
          key: service
          service
          link
          name
        }
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
