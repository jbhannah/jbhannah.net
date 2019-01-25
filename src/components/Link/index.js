import { Link as GatsbyLink } from "gatsby"
import React from "react"

const styles = {
  borderRadius: "0.3em",
  code: {
    textShadow: "none",
  },
}

const Link = props => {
  if (props.hasOwnProperty("to")) {
    return <GatsbyLink css={styles} {...props} />
  }

  return <a css={styles} {...props} />
}

export default Link
