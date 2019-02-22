exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type !== "ImageSharp") return

  const { name } = getNode(node.parent)
  createNodeField({ node, name: "name", value: name })
}
