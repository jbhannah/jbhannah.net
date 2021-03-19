import { render } from "enzyme"
import * as React from "react"
import { Link } from "."

const TestLink = (props) => render(<Link {...props} />)
const link = (t: cheerio.Cheerio) => t.find("a")

describe("Link", () => {
  describe("with an internal link", () => {
    const tree = TestLink({ href: "/" })

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("renders an a", () => {
      expect(tree.attr()).toHaveProperty("href", "/")
    })

    it("does not add a target property", () => {
      expect(tree.attr()).not.toHaveProperty("target")
    })

    it("does not add a rel property", () => {
      expect(tree.attr()).not.toHaveProperty("rel")
    })
  })

  describe("with an anchor link", () => {
    const tree = TestLink({ href: "#fn-1" })

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("renders an a", () => {
      expect(tree.attr()).toHaveProperty("href", "#fn-1")
    })

    it("does not add a target property", () => {
      expect(tree.attr()).not.toHaveProperty("target")
    })

    it("does not add a rel property", () => {
      expect(tree.attr()).not.toHaveProperty("rel")
    })
  })

  describe("with an external link", () => {
    const tree = TestLink({ href: "https://www.example.com" })

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("renders an a", () => {
      expect(tree.attr()).toHaveProperty("href", "https://www.example.com")
    })

    it("adds a target property", () => {
      expect(tree.attr()).toHaveProperty("target", "_blank")
    })

    it("adds a rel property", () => {
      expect(tree.attr()).toHaveProperty("rel", "noopener")
    })

    describe("with a rel property", () => {
      const tree = TestLink({ href: "https://www.example.com", rel: "license" })

      it("renders correctly", () => {
        expect(tree).toMatchSnapshot()
      })

      it("appends to the rel property", () => {
        expect(tree.attr()).toHaveProperty("rel", "license noopener")
      })
    })
  })
})
