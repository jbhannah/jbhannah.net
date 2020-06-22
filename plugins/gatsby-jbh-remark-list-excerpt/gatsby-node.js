const footnotes = require("remark-footnotes")
const graphql = require("gatsby/graphql")
const remark = require("remark")
const remark2rehype = require("remark-rehype")
const { select } = require("unist-util-select")
const remove = require("unist-util-remove")
const stripPosition = require("unist-util-remove-position")

const excerpt = ({ link }) => (tree) => {
  if (!link) {
    tree.children = [select("element[tagName=p]", tree)]
  }

  stripPosition(tree, true)
  remove(tree, { tagName: "sup" })

  return tree
}

exports.createResolvers = ({ createResolvers, loadNodeContent }) => {
  createResolvers({
    MarkdownRemark: {
      listExcerptHtmlAst: {
        type: graphql.GraphQLJSON,
        resolve: async (source) => {
          const { link } = source.frontmatter
          const content = await loadNodeContent(source)

          const mdast = remark().use(footnotes).parse(content)

          const hast = await remark()
            .use(remark2rehype)
            .use(excerpt, { link })
            .run(mdast)

          return hast
        },
      },
    },
  })
}
