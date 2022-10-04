import { render } from "@testing-library/react"
import * as React from "react"
import { MarginFix } from "."

const TestMarginFix = (props = {}) => render(<MarginFix {...props} />)

describe("MarginFix", () => {
  it("renders correctly", () => {
    const { container } = TestMarginFix()

    expect(container).toMatchSnapshot()
  })
})
