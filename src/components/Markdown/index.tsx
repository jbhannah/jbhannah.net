import PropTypes from "prop-types"
import React, { Fragment } from "react"
import rehypeReact from "rehype-react"
import visit from "unist-util-visit"
import { Blockquote } from "../Blockquote"
import { Code } from "../Code"
import { H2, H3, H4, H5, H6 } from "../Heading"
import { Link } from "../Link"

const headingPattern = /^h(\d)$/

const isTag = (node, tagName) =>
  node.hasOwnProperty("type") &&
  node.type === "element" &&
  node.hasOwnProperty("tagName") &&
  node.tagName === tagName

const newSection = (children) => {
  const section = { type: "element", tagName: "section" }
  section.children = children(section)
  return section
}

const renderAst = (htmlAst) => {
  let currentLevel, currentParent, currentSection

  visit(htmlAst, (node, index, parent) => {
    if (node.type === "root") return visit.CONTINUE

    if (node.type === "element" && headingPattern.test(node.tagName)) {
      const level = node.tagName.match(headingPattern)[1]

      if (level > currentLevel) {
        const section = newSection(() => parent.children.splice(index, 1))
        currentSection.children.push(section)
        currentSection = section
      } else {
        currentSection = newSection((section) =>
          parent.children.splice(index, 1, section)
        )
      }

      currentLevel = level
      return visit.SKIP
    }

    const prevSibling = parent.children[index - 1]

    if (
      typeof currentSection === "undefined" ||
      typeof prevSibling === "undefined" ||
      parent === currentParent ||
      (isTag(node, "div") &&
        node.properties.hasOwnProperty("class") &&
        node.properties.class.includes("footnotes"))
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
      code: Code,
      h2: H2,
      h3: H3,
      h4: H4,
      h5: H5,
      h6: H6,
    },
  }).Compiler(htmlAst)
}

export const Markdown = ({ htmlAst, root = Fragment }) => {
  const html = renderAst(htmlAst)
  const R = root

  return <R {...html.props} />
}

export default Markdown

Markdown.propTypes = {
  htmlAst: PropTypes.object,
  root: PropTypes.node,
}
