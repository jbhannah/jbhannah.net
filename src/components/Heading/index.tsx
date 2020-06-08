import PropTypes from "prop-types"
import * as React from "react"

const headingCSS = {
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
  return <H css={headingCSS} {...props} />
}

export const HeadingFactory = (level) => (props) => (
  <Heading level={level} {...props} />
)

export default Heading

Heading.propTypes = {
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
}
