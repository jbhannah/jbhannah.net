import PropTypes from "prop-types"
import React, { Fragment } from "react"
import rehypeReact from "rehype-react"
import { HeadingFactory } from "../Heading"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h2: HeadingFactory("h2"),
    h3: HeadingFactory("h3"),
    h4: HeadingFactory("h4"),
    h5: HeadingFactory("h5"),
    h6: HeadingFactory("h6"),
  },
}).Compiler

export const Markdown = ({ htmlAst, root = Fragment }) => {
  const html = renderAst(htmlAst)

  if (html.type !== root.type) {
    const R = root
    return <R>{html.props.children}</R>
  }

  return html
}

export default Markdown

Markdown.propTypes = {
  htmlAst: PropTypes.object,
  root: PropTypes.node,
}
