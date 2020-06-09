import { render, shallow } from "enzyme"
import { StaticQuery } from "gatsby"
import * as React from "react"
import Layout, { PureLayout } from "."

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

StaticQuery.mockImplementationOnce(({ render: r }) => r(data))

const TestLayout = (props = {}) => render(<Layout {...props} />)
const TestPureLayout = (props = {}) =>
  shallow(<PureLayout {...{ data, ...props }} />)

describe("Layout", () => {
  it("renders correctly", () => {
    const tree = TestLayout()
    expect(tree).toMatchSnapshot()
  })
})

describe("PureLayout", () => {
  it("renders correctly", () => {
    const tree = TestPureLayout()
    expect(tree).toMatchSnapshot()
  })
})
