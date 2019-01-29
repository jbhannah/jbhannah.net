import PropTypes from "prop-types"
import React from "react"

const styles = {
  a: {
    background: "none",
    textShadow: "none",
  },
  code: {
    fontSize: "inherit",
  },
}

export const Heading = ({ level, ...props }) => {
  const H = level
  return <H css={styles} {...props} />
}

export const HeadingFactory = level => props => (
  <Heading level={level} {...props} />
)

export default Heading

Heading.propTypes = {
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
}
