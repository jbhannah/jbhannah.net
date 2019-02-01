import PropTypes from "prop-types"
import React, { Fragment } from "react"
import rehypeReact from "rehype-react"
import visit from "unist-util-visit"
import Blockquote from "../Blockquote"
import { HeadingFactory } from "../Heading"
import Link from "../Link"

const renderAst = htmlAst => {
  const headingPattern = /^h(\d)$/

  const isTag = (node, tagName) =>
    node.hasOwnProperty("type") &&
    node.type === "element" &&
    node.hasOwnProperty("tagName") &&
    node.tagName === tagName

  const newSection = (children = []) => ({
    type: "element",
    tagName: "section",
    children,
  })

  let currentLevel, currentParent, currentSection

  visit(htmlAst, (node, index, parent) => {
    if (node.type === "root") return visit.CONTINUE

    const prevSibling = parent.children[index - 1]

    if (node.type === "element" && headingPattern.test(node.tagName)) {
      const level = node.tagName.match(headingPattern)[1]

      if (level > currentLevel) {
        const section = newSection(parent.children.splice(index, 1))
        currentSection.children.push(section)
        currentSection = section
      } else {
        currentSection = newSection(
          parent.children.splice(index, 1, currentSection)
        )
      }

      currentLevel = level
      return visit.SKIP
    }

    if (
      !currentSection ||
      !prevSibling ||
      parent === currentParent ||
      (isTag(node, "div") && node.properties.className.includes("footnotes"))
    ) {
      return visit.SKIP
    }

    currentParent = node

    if (isTag(prevSibling, "section")) {
      const [curr] = parent.children.splice(index, 1)
      currentSection.children.push(curr)
      return index
    }

    return index - 1
  })

  return new rehypeReact({
    createElement: React.createElement,
    components: {
      a: Link,
      blockquote: Blockquote,
      h2: HeadingFactory("h2"),
      h3: HeadingFactory("h3"),
      h4: HeadingFactory("h4"),
      h5: HeadingFactory("h5"),
      h6: HeadingFactory("h6"),
    },
  }).Compiler(htmlAst)
}

export const Markdown = ({ htmlAst, root = Fragment }) => {
  const html = renderAst(htmlAst)

  if (html.type !== root.type) {
    const R = root
    return <R {...html.props} />
  }

  return html
}

export default Markdown

Markdown.propTypes = {
  htmlAst: PropTypes.object,
  root: PropTypes.node,
}
