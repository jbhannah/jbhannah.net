import { Comment, Element, Node, Root, Text } from "hast"
import * as React from "react"
import rehypeReact from "rehype-react"
import visit from "unist-util-visit"
import { Blockquote } from "../Blockquote"
import { Code } from "../Code"
import { H2, H3, H4, H5, H6 } from "../Heading"
import { Link } from "../Link"

const headingPattern = /^h(\d)$/

const isTag = (node: Node, tagName: string) =>
  node.type === "element" && (node as Element).tagName === tagName

const newSection = (
  children: (section: Element) => (Element | Comment | Text)[]
) => {
  const section: Element = { type: "element", tagName: "section", children: [] }
  section.children = children(section)
  return section
}

const compiler = new rehypeReact({
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
}).Compiler

const renderAst = (htmlAst: Node) => {
  let currentLevel: number, currentParent: Element, currentSection: Element

  visit(htmlAst, (node: Element | Root, index, parent: Element) => {
    if (node.type === "root") return visit.CONTINUE

    if (
      node.type === "element" &&
      headingPattern.test((node as Element).tagName)
    ) {
      const level: number = parseInt(
        (node as Element).tagName.match(headingPattern)[1]
      )

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
        (node.properties.class as string).includes("footnotes"))
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

  return compiler(htmlAst)
}

interface MarkdownProps {
  htmlAst: Node
  root?: React.ReactType
}

export const Markdown: React.FunctionComponent<MarkdownProps> = ({
  htmlAst,
  root: R = React.Fragment,
}) => {
  const html = renderAst(htmlAst)

  return <R {...html.props} />
}
