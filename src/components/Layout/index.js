import { graphql, StaticQuery } from "gatsby"
import "prismjs/themes/prism-solarizedlight.css"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"
import Footer from "../Footer"
import Header from "../Header"
import "./index.css"
import styles from "./styles.module.css"

const Layout = ({ children, data }) => (
  <div className={styles.container}>
    <Helmet title={data.site.siteMetadata.title} />
    <Header title={data.site.siteMetadata.title} />
    <main className={styles.content}>{children}</main>
    <Footer className={styles.footer} title={data.site.siteMetadata.title} />
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
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
