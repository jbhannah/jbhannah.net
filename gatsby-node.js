const path = require("path")
const slugRegex = /\d{4}-\d{2}-\d{2}-([\w-]+)/

const pageQuery = `
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
            source
          }
        }
      }
    }
  }
`

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type !== "MarkdownRemark") return

  if (
    node.hasOwnProperty("frontmatter") &&
    !node.frontmatter.hasOwnProperty("link")
  ) {
    node.frontmatter.link = null
  }

  const fileNode = getNode(node.parent)

  const base =
    fileNode.sourceInstanceName === "pages"
      ? ""
      : fileNode.sourceInstanceName + "/"
  const slug = base + fileNode.name.match(slugRegex)[1]

  createNodeField({ node, name: "slug", value: slug })
  createNodeField({
    node,
    name: "source",
    value: fileNode.sourceInstanceName,
  })
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(pageQuery)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, source } = node.fields

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${source}.js`),
      context: { slug },
    })
  })

  return
}
