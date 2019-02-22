exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type !== "MarkdownRemark") return

  const { relativeDirectory } = getNode(node.parent)
  createNodeField({ node, name: "source", value: relativeDirectory || "pages" })
}
