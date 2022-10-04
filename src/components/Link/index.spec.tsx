import { render, screen } from "@testing-library/react"
import * as React from "react"
import { Link } from "."

const TestLink = (props) => render(<Link {...props}>Test Link</Link>)

describe("Link", () => {
  describe("with an internal link", () => {
    beforeEach(() => TestLink({ href: "/" }))

    it("renders correctly", () => {
      expect(screen.getByText("Test Link")).toMatchSnapshot()
    })

    it("renders an a", () => {
      expect(screen.getByText("Test Link")).toHaveAttribute("href", "/")
    })

    it("does not add a target property", () => {
      expect(screen.getByText("Test Link")).not.toHaveAttribute("target")
    })

    it("does not add a rel property", () => {
      expect(screen.getByText("Test Link")).not.toHaveAttribute("rel")
    })
  })

  describe("with an anchor link", () => {
    beforeEach(() => TestLink({ href: "#fn-1" }))

    it("renders correctly", () => {
      expect(screen.getByText("Test Link")).toMatchSnapshot()
    })

    it("renders an a", () => {
      expect(screen.getByText("Test Link")).toHaveAttribute("href", "#fn-1")
    })

    it("does not add a target property", () => {
      expect(screen.getByText("Test Link")).not.toHaveAttribute("target")
    })

    it("does not add a rel property", () => {
      expect(screen.getByText("Test Link")).not.toHaveAttribute("rel")
    })
  })

  describe("with an external link", () => {
    beforeEach(() =>
      TestLink({
        href: "https://www.example.com",
      })
    )

    it("renders correctly", () => {
      expect(screen.getByText("Test Link")).toMatchSnapshot()
    })

    it("renders an a", () => {
      expect(screen.getByText("Test Link")).toHaveAttribute(
        "href",
        "https://www.example.com"
      )
    })

    it("adds a target property", () => {
      expect(screen.getByText("Test Link")).toHaveAttribute("target", "_blank")
    })

    it("adds a rel property", () => {
      expect(screen.getByText("Test Link")).toHaveAttribute("rel", "noopener")
    })
  })

  describe("with a rel property", () => {
    beforeEach(() =>
      TestLink({
        href: "https://www.example.com",
        rel: "license",
      })
    )

    it("renders correctly", () => {
      expect(screen.getByText("Test Link")).toMatchSnapshot()
    })

    it("appends to the rel property", () => {
      expect(screen.getByText("Test Link")).toHaveAttribute(
        "rel",
        "license noopener"
      )
    })
  })
})
