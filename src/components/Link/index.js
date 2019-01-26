import { Link as GatsbyLink } from "gatsby"
import React from "react"

const styles = {
  borderRadius: "0.3em",
  code: {
    textShadow: "none",
  },
}

const Link = ({ to, href, ...props }) => {
  if (to) {
    return <GatsbyLink css={styles} to={to} {...props} />
  }

  if (/^https?:\/\/(?!jbhannah\.net)/.test(href)) {
    props.rel = "noopener"
    props.target = "_blank"
  }

  return <a css={styles} href={href} {...props} />
}

export default Link
