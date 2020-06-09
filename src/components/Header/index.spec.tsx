import { render } from "enzyme"
import * as Gatsby from "gatsby"
import * as React from "react"
import { Header } from "."

const data = {
  site: {
    siteMetadata: {
      title: "Test Site",
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

describe("Header", () => {
  const tree = render(<Header />)

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot()
  })
})
