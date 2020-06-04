module.exports = {
  siteMetadata: {
    siteUrl: "https://jbhannah.net",
    title: "Jesse B. Hannah",
    description: "jbhannah's personal website and blog",
    twitterCreator: "@jbhannah",
    name: {
      first: "Jesse",
      last: "Hannah",
    },
    username: "jbhannah",
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
      resolve: "gatsby-plugin-gtag",
      options: {
        trackingId: "UA-75018467-1",
      },
    },
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
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: `${__dirname}/src/fonts`,
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-sharp",
      options: {
        plugins: ["gatsby-jbh-sharp-name"],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-jbh-remark-first-header-title",
          "gatsby-jbh-remark-frontmatter",
          "gatsby-jbh-remark-paginator",
          "gatsby-jbh-remark-slug",
          "gatsby-jbh-remark-source",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-numbered-footnotes",
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-prismjs",
            options: { inlineCodeMarker: "›" },
          },
          {
            resolve: "@raae/gatsby-remark-oembed",
            options: {
              providers: { exclude: ["Flickr", "Instagram", "Reddit"] },
            },
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
    "gatsby-plugin-netlify-cache",
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        allPageHeaders: [
          "Link: </static/jetbrainsmono-regular.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
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
