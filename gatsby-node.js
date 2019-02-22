const path = require("path")
const { defaultFrontmatter } = require("./lib/frontmatter")

const PRODUCTION = process.env.NODE_ENV === "production"

const dateRegex = /\d{4}-\d{2}-\d{2}-/
const pageQueryFilter = PRODUCTION
  ? "(filter: { frontmatter: { draft: { ne: true } } })"
  : ""
const pageQuery = `
  {
    allMarkdownRemark${pageQueryFilter} {
      edges {
        node {
          frontmatter {
            draft
          }
          fields {
            slug
            source
          }
        }
      }
    }
  }
`

const onCreateImageSharpNode = ({
  node,
  getNode,
  actions: { createNodeField },
}) => {
  const { name } = getNode(node.parent)
  createNodeField({ node, name: "name", value: name })
}

const onCreateMarkdownNode = ({
  node,
  getNode,
  actions: { createNodeField },
}) => {
  if (node.hasOwnProperty("frontmatter")) {
    for (const property in defaultFrontmatter) {
      if (!node.frontmatter.hasOwnProperty(property)) {
        node.frontmatter[property] = defaultFrontmatter[property]
      }
    }
  }

  const { ext, relativeDirectory, relativePath } = getNode(node.parent)
  const slug = relativePath.replace(dateRegex, "").replace(ext, "")

  createNodeField({ node, name: "slug", value: slug })
  createNodeField({
    node,
    name: "source",
    value: relativeDirectory === "" ? "pages" : relativeDirectory,
  })
}

exports.onCreateNode = ({ node, ...rest }) => {
  switch (node.internal.type) {
    case "ImageSharp":
      onCreateImageSharpNode({ node, ...rest })
      break
    case "MarkdownRemark":
      onCreateMarkdownNode({ node, ...rest })
      break
  }
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const counts = {
    articles: 0,
  }
  const perPage = {
    articles: 10,
  }

  const {
    data: {
      allMarkdownRemark: { edges: pages },
    },
  } = await graphql(pageQuery)

  pages.forEach(
    ({
      node: {
        frontmatter: { draft },
        fields: { slug, source },
      },
    }) => {
      if (!draft && counts.hasOwnProperty(source)) counts[source] += 1

      createPage({
        path: slug,
        component: path.resolve("./src/templates/article.jsx"),
        context: { slug },
      })
    }
  )

  for (let source in counts) {
    const numPages = Math.ceil(counts[source] / perPage[source])
    const root = source === "articles" ? "/" : `/${source}/`
    Array.from({ length: numPages }).forEach((_, i) => {
      const page = i + 1
      createPage({
        path: i === 0 ? root : `${root}page/${page}`,
        component: path.resolve("./src/templates/article-list.jsx"),
        context: {
          page,
          numPages,
          limit: perPage[source],
          skip: i * perPage[source],
        },
      })
    })
  }
}
