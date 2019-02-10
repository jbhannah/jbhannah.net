import { render, shallow } from "enzyme"
import { StaticQuery } from "gatsby"
import React from "react"
import Layout, { PureLayout } from "."

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
}

StaticQuery.mockImplementationOnce(({ render: r }) => r(data))

const TestLayout = props => render(<Layout {...props} />)
const TestPureLayout = props => shallow(<PureLayout {...{ data, ...props }} />)

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
