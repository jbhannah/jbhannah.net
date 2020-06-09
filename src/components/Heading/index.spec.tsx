import { render, shallow } from "enzyme"
import * as React from "react"
import { Heading, HeadingFactory } from "."

const TestHeading = (props) => shallow(<Heading {...props} />)

describe("Heading", () => {
  describe("with a valid heading level", () => {
    const tree = TestHeading({ level: "h1" })

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })
  })
})

describe("HeadingFactory", () => {
  const H1 = HeadingFactory("h1")
  const tree = render(<H1></H1>)

  it("returns a Heading", () => {
    expect(tree.is("h1")).toBeTruthy()
  })
})
