import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './index.css'
import 'prismjs/themes/prism-solarizedlight.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './index.module.css'

const TemplateWrapper = ({ children, data }) => (
  <div className={styles.container}>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header title={data.site.siteMetadata.title} />
    <main className={styles.content}>
      {children()}
    </main>
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
