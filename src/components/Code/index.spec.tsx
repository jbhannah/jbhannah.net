import { render, screen } from "@testing-library/react"
import * as React from "react"
import { Code } from "."

const TestCode = (props = {}) => render(<Code data-testid="code" {...props} />)

describe("Code", () => {
  beforeEach(() => TestCode())

  it("renders correctly", () => {
    expect(screen.getByTestId("code")).toMatchSnapshot()
  })
})
