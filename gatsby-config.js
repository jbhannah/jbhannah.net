module.exports = {
  siteMetadata: {
    siteUrl: "https://jbhannah.net",
    title: "Jesse B. Hannah",
  },
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "en",
      },
    },
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
        path: `${__dirname}/src/articles`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-numbered-footnotes",
          {
            resolve: "gatsby-remark-prismjs",
            options: { inlineCodeMarker: "›" },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/page/*", "/*/page/*"],
      },
    },
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        allPageHeaders: [
          "Link: </static/hack-regular-subset.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
          "Link: </static/lora-latin-400.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
          "Link: </static/lora-latin-400italic.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
          "Link: </static/lora-latin-700.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
          "Link: </static/lora-latin-700italic.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
          "Link: </static/varela-round-latin-400.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
        ],
      },
    },
  ],
}
