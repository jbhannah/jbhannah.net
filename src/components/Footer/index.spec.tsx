import { render, screen } from "@testing-library/react"
import MockDate from "mockdate"
import * as React from "react"
import Footer from "."

MockDate.set("2019-02-05T01:17:07.551Z")

const TestFooter = (props) => render(<Footer data-testid="footer" {...props} />)

describe("Footer", () => {
  beforeEach(() =>
    TestFooter({
      fullname: "Fullname",
      pronouns: "Pronouns",
    })
  )

  it("renderes correctly", () => {
    expect(screen.getByTestId("footer")).toMatchSnapshot()
  })
})
