import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
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

const layoutCSS = {
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

const mainCSS = {
  ...contentWidthColumn,
  flexGrow: 1,
  [mq.lg]: {
    margin: 0,
  },
}

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
  <div css={layoutCSS}>
    <Global />
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
    <main css={mainCSS}>{children}</main>
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

const Layout = (props) => (
  <StaticQuery
    query={query}
    render={(data) => <PureLayout {...{ data, ...props }} />}
  />
)

export default Layout

PureLayout.propTypes = {
  children: PropTypes.node,
}
