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
    'gatsby-plugin-netlify'
  ],
}
