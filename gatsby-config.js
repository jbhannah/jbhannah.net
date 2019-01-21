const excerpt = require("./src/utils/excerpt")

module.exports = {
  siteMetadata: {
    title: "Jesse B. Hannah",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/src/articles/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        excerpt: excerpt,
        plugins: ["gatsby-remark-numbered-footnotes", "gatsby-remark-prismjs"],
      },
    },
    "gatsby-plugin-netlify",
  ],
}
