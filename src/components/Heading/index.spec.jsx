import { shallow } from "enzyme"
import React from "react"
import Heading, { HeadingFactory } from "."

const TestHeading = (props) => shallow(<Heading {...props} />)

describe("Heading", () => {
  describe("with a valid heading level", () => {
    const tree = TestHeading({ level: "h1" })

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })
  })

  describe("with an invalid heading level", () => {
    it("prints a console error", () => {
      const warn = jest.spyOn(console, "error")
      warn.mockImplementation()

      TestHeading({ level: "h7" })

      expect(warn).toBeCalled()
      warn.mockRestore()
    })
  })
})

describe("HeadingFactory", () => {
  const tree = shallow(HeadingFactory("h1")())

  it("returns a Heading", () => {
    expect(tree.is("h1")).toBeTruthy()
  })
})
