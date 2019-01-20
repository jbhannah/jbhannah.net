const path = require("path")

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "develop") {
    config.preLoader("eslint-loader", {
      test: /\.js$/,
      exclude: /node_modules/,
    })
    config.merge({
      eslint: {
        emitWarning: true,
      },
    })
  }
  return config
}

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.type === "MarkdownRemark") {
    if (node.frontmatter && !node.frontmatter.link) {
      node.frontmatter.link = null
    }

    const { createNodeField } = boundActionCreators
    const fileNode = getNode(node.parent)

    const base =
      fileNode.sourceInstanceName === "pages"
        ? ""
        : fileNode.sourceInstanceName + "/"
    const slug = base + fileNode.name.match(/(\d{4}-\d{2}-\d{2})-(.*)/)[2]

    createNodeField({ node, name: "slug", value: slug })
    createNodeField({
      node,
      name: "source",
      value: fileNode.sourceInstanceName,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise(resolve => {
    graphql(`
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
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const slug = node.fields.slug

        createPage({
          path: slug,
          component: path.resolve(`./src/templates/${node.fields.source}.js`),
          context: { slug },
        })

        resolve()
      })
    })
  })
}
