module.exports = {
  siteMetadata: {
    siteUrl: "https://jbhannah.net",
    title: "Jesse B. Hannah",
    socialLinks: [
      {
        service: "GitHub",
        link: "https://github.com/jbhannah",
        name: "jbhannah",
      },
      {
        service: "Keybase",
        link: "https://keybase.io/jbhannah",
        name: "jbhannah",
      },
      {
        service: "LinkedIn",
        link: "https://www.linkedin.com/in/jbhannah",
        name: "jbhannah",
      },
      {
        service: "Twitter",
        link: "https://twitter.com/jbhannah",
        name: "@jbhannah",
      },
    ],
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
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-numbered-footnotes",
          "gatsby-remark-smartypants",
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
        serialize: ({
          site: {
            siteMetadata: { siteUrl },
          },
          allSitePage: { edges },
        }) =>
          edges.map(({ node: { path } }) => {
            const root = path === "/"

            return {
              url: siteUrl + path,
              changefreq: root ? "weekly" : "never",
              priority: root ? 1.0 : 0.7,
            }
          }),
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
        headers: {
          "/page/*": ["X-Robots-Tag: noindex"],
          "/*/page/*": ["X-Robots-Tag: noindex"],
        },
      },
    },
  ],
}
