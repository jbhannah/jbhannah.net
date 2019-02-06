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

const Layout = ({
  children,
  data: {
    site: {
      siteMetadata: { title, socialLinks },
    },
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
    <Helmet {...{ title }} />
    <Header {...{ title, socialLinks }} />
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
        title
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

export default props => (
  <StaticQuery
    query={query}
    render={data => <Layout data={data} {...props} />}
  />
)

Layout.propTypes = {
  children: PropTypes.node,
}
