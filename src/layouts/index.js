import "prismjs/themes/prism-solarizedlight.css"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"
import Footer from "../components/Footer"
import Header from "../components/Header"
import "./index.css"
import styles from "./index.module.css"

const TemplateWrapper = ({ children, data }) => (
  <div className={styles.container}>
    <Helmet title={data.site.siteMetadata.title} />
    <Header title={data.site.siteMetadata.title} />
    <main className={styles.content}>{children}</main>
    <Footer className={styles.footer} title={data.site.siteMetadata.title} />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
