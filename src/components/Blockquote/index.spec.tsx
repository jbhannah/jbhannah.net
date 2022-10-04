import { render, screen } from "@testing-library/react"
import * as React from "react"
import { Blockquote } from "."

const TestBlockquote = (props = {}) =>
  render(<Blockquote data-testid="blockquote" {...props} />)

describe("Blockquote", () => {
  beforeEach(() => TestBlockquote())

  it("renders correctly", () => {
    expect(screen.getByTestId("blockquote")).toMatchSnapshot()
  })
})
