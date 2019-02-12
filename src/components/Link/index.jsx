import { Link as GatsbyLink } from "gatsby"
import { OutboundLink } from "gatsby-plugin-gtag"
import PropTypes from "prop-types"
import React from "react"
import { linkColor } from "../../utils/styles"

const styles = {
  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`,
  borderRadius: "0.3em",
  color: linkColor,
  code: {
    textShadow: "none",
  },
}

const domainPattern = new RegExp(/^https?:\/\/(?!jbhannah\.net)/)

const Link = ({ href, ...props }) => {
  props.css = Object.assign({}, props.css, styles)

  if (href.startsWith("/")) {
    return <GatsbyLink to={href} {...props} />
  }

  if (domainPattern.test(href)) {
    const hasRel = props.hasOwnProperty("rel")
    props.rel = `${hasRel ? `${props.rel} ` : ""}noopener`
    props.target = "_blank"
    return <OutboundLink {...{ href, ...props }} />
  }

  return <a {...{ href, ...props }} />
}

export default Link

Link.propTypes = {
  href: PropTypes.string.isRequired,
}
