import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"

const styles = {
  "& a": {
    background: "none",
  },
}

const headings = {
  h1: styled.h1(styles),
  h2: styled.h2(styles),
  h3: styled.h3(styles),
  h4: styled.h4(styles),
  h5: styled.h5(styles),
  h6: styled.h6(styles),
}

const Heading = ({ children, level, ...props }) => {
  const H = headings[level]
  return <H {...props}>{children}</H>
}

export default Heading

Heading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.oneOf(Object.keys(headings)),
}
