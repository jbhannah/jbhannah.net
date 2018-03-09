module.exports = {
  siteMetadata: {
    title: 'Jesse B. Hannah',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/src/articles/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-netlify',
  ],
}
