const { defaultFrontmatter } = require("../../lib/frontmatter")

exports.onCreateNode = ({ node }) => {
  if (node.internal.type !== "MarkdownRemark") return
  if (!node.hasOwnProperty("frontmatter")) return

  for (const property in defaultFrontmatter) {
    if (!node.frontmatter.hasOwnProperty(property)) {
      node.frontmatter[property] = defaultFrontmatter[property]
    }
  }
}
