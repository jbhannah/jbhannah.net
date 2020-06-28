import remove from "unist-util-remove"
import stripPosition from "unist-util-remove-position"

const excerpt = ({ htmlAst, frontmatter }) => {
  if (frontmatter.link === null) {
    htmlAst.children = [htmlAst.children.filter((n) => n.tagName === "p")[0]]
  }

  stripPosition(htmlAst, true)
  remove(htmlAst, { tagName: "sup" })

  return htmlAst
}

export default excerpt
