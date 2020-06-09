import { render } from "enzyme"
import * as React from "react"
import { Layout } from "."

describe("Layout", () => {
  const tree = render(<Layout />)

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot()
  })
})
