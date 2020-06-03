import { shallow } from "enzyme"
import MockDate from "mockdate"
import React from "react"
import Footer from "."

MockDate.set("2019-02-05T01:17:07.551Z")

const TestFooter = (props) => shallow(<Footer {...props} />)

describe("Footer", () => {
  const tree = TestFooter({ title: "Test Site" })

  it("renderes correctly", () => {
    expect(tree).toMatchSnapshot()
  })
})
