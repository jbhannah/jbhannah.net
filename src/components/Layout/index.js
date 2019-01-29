import { Global } from "@emotion/core"
import { graphql, StaticQuery } from "gatsby"
import "prismjs/themes/prism-solarizedlight.css"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"
import { contentWidth, headerWidth, mq } from "../../utils/styles"
import Footer from "../Footer"
import Header from "../Header"

const contentWidthColumn = {
  margin: "0 auto",
  maxWidth: contentWidth,
  padding: "0 1rem",
  width: "100%",
}

const Layout = ({ children, data }) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      maxWidth: `calc(${headerWidth} + ${contentWidth})`,
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
            padding: 0,
            overflow: "initial",
            float: "left",
            minWidth: "100%",
          },
        },
        ".gatsby-highlight-code-line": {
          backgroundColor: "#feb",
          display: "block",
          marginRight: "-1.15em",
          marginLeft: "-1.2em",
          paddingRight: "1.15em",
          paddingLeft: "0.9em",
          borderLeft: "0.3em solid #f99",
        },
      }}
    />
    <Helmet title={data.site.siteMetadata.title} />
    <Header title={data.site.siteMetadata.title} />
    <main css={[contentWidthColumn, { flexGrow: 1, [mq.lg]: { margin: 0 } }]}>
      {children}
    </main>
    <Footer
      css={[
        contentWidthColumn,
        {
          alignSelf: "flex-end",
          fontSize: "0.75rem",
          margin: "1rem auto",
          [mq.lg]: { marginLeft: headerWidth },
          [mq.xl]: { marginLeft: 0 },
        },
      ]}
      title={data.site.siteMetadata.title}
    />
  </div>
)

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
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
