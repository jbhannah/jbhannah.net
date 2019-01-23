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

export const Heading = ({ children, level, ...props }) => {
  const H = level
  return (
    <H css={styles} {...props}>
      {children}
    </H>
  )
}

export const HeadingFactory = level => ({ children, ...props }) => (
  <Heading level={level} {...props}>
    {children}
  </Heading>
)

export default Heading

Heading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
}
