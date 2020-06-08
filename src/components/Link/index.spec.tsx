import { shallow } from "enzyme"
import * as React from "react"
import Link from "."

const TestLink = (props) => shallow(<Link {...props} />)

describe("Link", () => {
  describe("with an internal link", () => {
    const tree = TestLink({ href: "/" })
    const link = (t) => t.find("ForwardRef")

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("renders a ForwardRef", () => {
      expect(link(tree).prop("to")).toBe("/")
    })

    it("does not add a target property", () => {
      expect(link(tree).props()).not.toHaveProperty("target")
    })

    it("does not add a rel property", () => {
      expect(link(tree).props()).not.toHaveProperty("rel")
    })
  })

  describe("with an anchor link", () => {
    const tree = TestLink({ href: "#fn-1" })
    const link = (t) => t.find("a")

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("renders an a", () => {
      expect(link(tree).prop("href")).toBe("#fn-1")
    })

    it("does not add a target property", () => {
      expect(link(tree).props()).not.toHaveProperty("target")
    })

    it("does not add a rel property", () => {
      expect(link(tree).props()).not.toHaveProperty("rel")
    })
  })

  describe("with an external link", () => {
    const tree = TestLink({ href: "https://www.example.com" })
    const link = (t) => t.find("a")

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("renders an a", () => {
      expect(link(tree).prop("href")).toBe("https://www.example.com")
    })

    it("adds a target property", () => {
      expect(link(tree).prop("target")).toBe("_blank")
    })

    it("adds a rel property", () => {
      expect(link(tree).prop("rel")).toBe("noopener")
    })

    it("adds an onClick handler for Google Analytics", () => {
      const onClick = link(tree).prop("onClick")
      window.gtag = jest.fn()

      expect(typeof onClick).toBe("function")

      link(tree).simulate("click")
      expect(window.gtag).toBeCalledWith("event", "click", {
        event_category: "outbound",
        event_label: "https://www.example.com",
        transport_type: "beacon",
      })
    })

    describe("with a rel property", () => {
      const tree = TestLink({ href: "https://www.example.com", rel: "license" })

      it("renders correctly", () => {
        expect(tree).toMatchSnapshot()
      })

      it("appends to the rel property", () => {
        expect(link(tree).prop("rel")).toBe("license noopener")
      })
    })
  })
})
