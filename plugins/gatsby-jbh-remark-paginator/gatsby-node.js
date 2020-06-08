const path = require("path")
const { PRODUCTION } = require("../../lib/production")

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

class PageGenerator {
  constructor(template, root, createPage, perPage = 10) {
    this.count = 0
    this.createPage = createPage
    this.perPage = perPage
    this.root = root === "" ? "/" : `/${root}/`
    this.template = template
  }

  generateListPages() {
    if (this.perPage === 0) return

    const numPages = Math.ceil(this.count / this.perPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      const page = i + 1

      this.createPage({
        path: i === 0 ? this.root : `${this.root}page/${page}`,
        component: path.resolve(
          `${__dirname}/../../src/templates/${this.template}-list.tsx`
        ),
        context: {
          page,
          numPages,
          limit: this.perPage,
          skip: i * this.perPage,
        },
      })
    })
  }

  generatePage(slug, draft) {
    const component = path.resolve(
      `${__dirname}/../../src/templates/${this.template}.tsx`
    )

    this.createPage({
      path: slug,
      component,
      context: { slug },
    })

    if (!draft) this.count++
  }
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pageGenerators = {
    articles: new PageGenerator("article", "", createPage),
    endorsements: new PageGenerator("article", "endorsements", createPage, 0),
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
      if (pageGenerators.hasOwnProperty(source))
        pageGenerators[source].generatePage(slug, draft)
    }
  )

  for (let source in pageGenerators) {
    pageGenerators[source].generateListPages()
  }
}
