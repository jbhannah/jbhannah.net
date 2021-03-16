module.exports = {
  siteMetadata: {
    siteUrl: "https://jbhannah.net",
    title: "Jesse B. Hannah",
    description: "jbhannah's personal website and blog",
    twitterCreator: "@jbhannah",
    name: {
      first: "Jesse",
      mi: "B",
      last: "Hannah",
    },
    username: "jbhannah",
    gender: "female",
    pronouns: ["she", "her"],
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
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
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
      resolve: "gatsby-source-filesystem",
      options: {
        name: "contents",
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
            options: {
              inlineCodeMarker: "›",
              languageExtensions: [
                {
                  extend: "ruby",
                  definition: {
                    operator: /::|\.\.\.?|->|[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
                  },
                },
              ],
              prompt: {
                user: "jbhannah",
                global: true,
              },
            },
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
    "gatsby-plugin-react-svg",
    {
      resolve: "gatsby-jbh-source-filesystem-parent",
      options: {
        fields: [
          "name",
          "relativeDirectory",
          "relativePath",
          "sourceInstanceName",
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
      resolve: "gatsby-plugin-typography",
      options: {
        omitGoogleFont: true,
        pathToConfigModule: "src/utils/typography.ts",
      },
    },
    "gatsby-plugin-less",
    "gatsby-redirect-from",
    "gatsby-plugin-meta-redirect",
  ],
}
