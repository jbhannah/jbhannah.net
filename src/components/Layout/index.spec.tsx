import { render, screen } from "@testing-library/react"
import * as React from "react"
import { Layout } from "."

describe("Layout", () => {
  beforeEach(() => render(<Layout data-testid="layout" />))

  it("renders correctly", () => {
    expect(screen.getByTestId("layout")).toMatchSnapshot()
  })
})
