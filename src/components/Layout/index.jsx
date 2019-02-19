import { Global } from "@emotion/core"
import { graphql, StaticQuery } from "gatsby"
import "prismjs/themes/prism-solarizedlight.css"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"
import {
  contentWidth,
  contentWidthColumn,
  headerWidth,
  mq,
} from "../../utils/styles"
import Footer from "../Footer"
import Header from "../Header"

export const PureLayout = ({
  children,
  data: {
    site: {
      siteMetadata: {
        siteUrl,
        title,
        description,
        twitterCreator,
        socialLinks,
      },
    },
    imageSharp: { fixed: avatar },
  },
}) => (
  <div
    css={{
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
    }}
  >
    <Global
      styles={{
        ".gatsby-highlight": {
          backgroundColor: "#fdf6e3",
          borderRadius: "0.3em",
          marginBottom: "1.58em",
          padding: "1em",
          overflow: "auto",
          "& pre[class*=language-]": {
            backgroundColor: "transparent",
            margin: 0,
            padding: "0 1em 0 0",
            overflow: "initial",
            float: "left",
            minWidth: "100%",
          },
        },
        ".gatsby-highlight-code-line": {
          backgroundColor: "#feb",
          display: "block",
          marginRight: "-2.2em",
          marginLeft: "-1.2em",
          paddingRight: "1em",
          paddingLeft: "0.9em",
          borderLeft: "0.3em solid #f99",
        },
      }}
    />
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={avatar} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={siteUrl} />
      <meta property="twitter:creator" content={twitterCreator} />
    </Helmet>
    <Header {...{ title, avatar, socialLinks }} />
    <main css={[contentWidthColumn, { flexGrow: 1, [mq.lg]: { margin: 0 } }]}>
      {children}
    </main>
    <Footer {...{ title }} />
  </div>
)

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
    imageSharp(fields: { name: { eq: "avatar" } }) {
      fixed(width: 160) {
        src
        srcSet
        srcSetWebp
      }
    }
  }
`

const Layout = props => (
  <StaticQuery
    query={query}
    render={data => <PureLayout {...{ data, ...props }} />}
  />
)

export default Layout

PureLayout.propTypes = {
  children: PropTypes.node,
}
