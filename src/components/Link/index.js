import { Link as GatsbyLink } from "gatsby"
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

const Link = ({ to, href, ...props }) => {
  if (to) {
    return <GatsbyLink css={styles} to={to} {...props} />
  }

  if (domainPattern.test(href)) {
    props.rel = "noopener"
    props.target = "_blank"
  }

  return <a css={styles} href={href} {...props} />
}

export default Link
