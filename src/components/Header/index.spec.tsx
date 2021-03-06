import { render } from "enzyme"
import * as Gatsby from "gatsby"
import * as React from "react"
import { Header } from "."

const data = {
  site: {
    siteMetadata: {
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
      gatsbyImageData: {
        images: {
          fallback: {
            src: "avatar.png",
          },
          sources: [
            {
              type: "image/webp",
              srcSet: "avatar-srcSet.webp",
            },
          ],
        },
      },
    },
  },
}

jest.spyOn(Gatsby, "useStaticQuery").mockImplementation(() => data)

describe("Header", () => {
  const tree = render(
    <Header
      {...{ title: "Title", fullname: "Fullname", pronouns: "Pronouns" }}
    />
  )

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot()
  })
})
