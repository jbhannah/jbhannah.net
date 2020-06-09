import { render } from "enzyme"
import * as Gatsby from "gatsby"
import * as React from "react"
import { Layout } from "."

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

jest.spyOn(Gatsby, "useStaticQuery").mockImplementation(() => data)

const TestLayout = (props = {}) => render(<Layout {...props} />)

describe("Layout", () => {
  it("renders correctly", () => {
    const tree = TestLayout()
    expect(tree).toMatchSnapshot()
  })
})
