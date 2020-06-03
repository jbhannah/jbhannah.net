import { shallow } from "enzyme"
import React from "react"
import MarginFix from "."

const TestMarginFix = (props) => shallow(<MarginFix {...props} />)

describe("MarginFix", () => {
  it("renders correctly", () => {
    const tree = TestMarginFix()
    expect(tree).toMatchSnapshot()
  })
})
