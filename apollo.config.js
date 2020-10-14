module.exports = {
  client: {
    addTypename: false,
    excludes: ["./node_modules/gatsby-transformer-sharp/src/*.js"],
    includes: ["./src/**/*.tsx","./src/**/*.ts","./plugins/**/*.js","./node_modules/gatsby-source-contentful/src/fragments.js","./node_modules/gatsby-source-datocms/fragments/*.js","./node_modules/gatsby-source-sanity/fragments/*.js","./node_modules/gatsby-transformer-sharp/src/fragments.js","./src/**/*.tsx","./src/**/*.ts","./plugins/**/*.js"],
    service: {
      name: "gatsbySchema",
      localSchemaFile: "./schema.json"
    },
    tagName: "graphql"
  }
}