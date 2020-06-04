const dateRegex = /\d{4}-\d{2}-\d{2}-/

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type !== "MarkdownRemark") return

  const { ext, relativePath } = getNode(node.parent)
  const slug = relativePath.replace(dateRegex, "").replace(ext, "")

  createNodeField({ node, name: "slug", value: `/${slug}` })
}
