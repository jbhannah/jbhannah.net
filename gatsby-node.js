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
  const counts = {}
  const perPage = 10
  const {
    data: {
      allMarkdownRemark: { edges: pages },
    },
  } = await graphql(pageQuery)

  pages.forEach(({ node: { fields: { slug, source } } }) => {
    if (!counts.hasOwnProperty(source)) counts[source] = 0
    counts[source] += 1

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${source}.js`),
      context: { slug },
    })
  })

  for (let source in counts) {
    const numPages = Math.ceil(counts[source] / perPage)
    const root = source === "articles" ? "/" : `/${source}/`
    Array.from({ length: numPages }).forEach((_, i) => {
      const page = i + 1
      createPage({
        path: i === 0 ? root : `${root}page/${page}`,
        component: path.resolve(`./src/templates/${source}-list.js`),
        context: {
          page,
          numPages,
          limit: perPage,
          skip: i * perPage,
        },
      })
    })
  }
}
