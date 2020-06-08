import { shallow } from "enzyme"
import * as React from "react"
import Blockquote from "."

const TestBlockquote = (props) => shallow(<Blockquote {...props} />)

describe("Blockquote", () => {
  const tree = TestBlockquote()

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot()
  })
})
