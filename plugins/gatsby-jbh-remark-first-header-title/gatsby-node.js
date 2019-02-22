const titleRegexp = /^# (.+)$/

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.internal.type !== "MarkdownRemark") return

  const lines = node.rawMarkdownBody.split("\n")
  const index = lines.findIndex(line => titleRegexp.test(line))

  if (index < 0) return

  const title = lines.splice(index, 1)[0].match(titleRegexp)[1]
  createNodeField({ node, name: "title", value: title })

  node.internal.content = lines.join("\n")
}
