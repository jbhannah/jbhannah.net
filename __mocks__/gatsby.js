const gatsby = jest.requireActual("gatsby")

const data = {
  site: {
    siteMetadata: {
      siteUrl: "https://www.example.com",
      title: "Test Site",
      description: "Test site",
      twitterCreator: "@jbhannah",
      socialLinks: [
        {
          key: "Test Service",
          service: "Test Service",
          link: "https://www.example.com",
          name: "Test Name",
        },
      ],
    },
  },
  file: {
    childImageSharp: {
      fixed: {
        src: "avatar-src.png",
        srcSet: "avatar-srcSet.png",
        srcSetWebp: "avatar-srcSet.webp",
      },
    },
  },
}

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  useStaticQuery: jest.fn(() => data),
}
