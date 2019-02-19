import { shallow } from "enzyme"
import React from "react"
import Header from "."

const TestHeader = props =>
  shallow(
    <Header
      title="Test Site"
      avatar={{
        src: "avatar-src.png",
        srcSet: "avatar-srcSet.png",
        srcSetWebp: "avatar-srcSet.webp",
      }}
      socialLinks={[
        {
          key: "Test Service",
          service: "Test Service",
          link: "https://www.example.com",
          name: "Test Name",
        },
      ]}
      {...props}
    />
  )

describe("Header", () => {
  const tree = TestHeader()

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot()
  })
})
