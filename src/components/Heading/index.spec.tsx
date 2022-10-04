import { render, screen } from "@testing-library/react"
import * as React from "react"
import { Heading } from "."

test("Heading with level h1 renders an h1 tag", () => {
  render(<Heading level="h1">Test H1</Heading>)

  const h1 = screen.getByRole("heading")

  expect(h1.tagName).toEqual("H1")
  expect(h1).toHaveTextContent("Test H1")
})
