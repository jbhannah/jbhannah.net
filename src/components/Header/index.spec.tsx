import { render, screen } from "@testing-library/react"
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
  beforeEach(() =>
    render(
      <Header
        data-testid="header"
        {...{ title: "Title", fullname: "Fullname", pronouns: "Pronouns" }}
      />
    )
  )

  it("renders correctly", () => {
    expect(screen.getByTestId("header")).toMatchSnapshot()
  })
})
