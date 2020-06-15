const DEFAULT_OPTIONS = {
  plugins: [],
  fields: ["sourceInstanceName"],
}

exports.onCreateNode = (
  { node, getNode, actions: { createNodeField } },
  options
) => {
  const opts = Object.assign({}, DEFAULT_OPTIONS, options)
  const parent = getNode(node.parent)

  if (parent && parent.internal.type === "File") {
    const parentFile = {}

    opts.fields.forEach((field) => {
      parentFile[field] = parent[field]
    })

    createNodeField({
      node,
      name: "parentFile",
      value: parentFile,
    })
  }
}
