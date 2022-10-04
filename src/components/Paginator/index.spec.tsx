import { render, screen } from "@testing-library/react"
import * as React from "react"
import { Paginator } from "."

const lis = (tree) => tree.querySelectorAll("li")
const linkAt = (tree, i) => lis(tree)[i].querySelector("a")
const hrefAt = (tree, i) => linkAt(tree, i).getAttribute("href")

const TestPaginator = (props) =>
  render(<Paginator data-testid="paginator" {...props} />)

describe("Paginator", () => {
  describe("with one page", () => {
    it("renders nothing", () => {
      const { container } = TestPaginator({
        base: "test",
        page: 1,
        numPages: 1,
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe("with three pages", () => {
    describe("on the first page", () => {
      beforeEach(() => TestPaginator({ base: "/", page: 1, numPages: 3 }))

      it("renders correctly", () => {
        expect(screen.getByTestId("paginator")).toMatchSnapshot()
      })

      it("contains seven <li> elements", () => {
        expect(lis(screen.getByTestId("paginator"))).toHaveLength(7)
      })

      it("does not link to the first page", () => {
        expect(
          screen.getByTestId("paginator").querySelectorAll("a")
        ).toHaveLength(4)
        expect(linkAt(screen.getByTestId("paginator"), 0)).toBeNull()
        expect(linkAt(screen.getByTestId("paginator"), 1)).toBeNull()
        expect(linkAt(screen.getByTestId("paginator"), 2)).toBeNull()
      })

      it("links to the next page", () => {
        expect(hrefAt(screen.getByTestId("paginator"), 5)).toBe("/page/2")
      })

      it("links to the last page", () => {
        expect(hrefAt(screen.getByTestId("paginator"), 6)).toBe("/page/3")
      })
    })

    describe("on the last page", () => {
      beforeEach(() => TestPaginator({ base: "/", page: 3, numPages: 3 }))

      it("renders correctly", () => {
        expect(screen.getByTestId("paginator")).toMatchSnapshot()
      })

      it("links to the first page", () => {
        expect(hrefAt(screen.getByTestId("paginator"), 0)).toBe("/")
      })

      it("links to the previous page", () => {
        expect(hrefAt(screen.getByTestId("paginator"), 1)).toBe("/page/2")
      })

      it("does not link to the last page", () => {
        expect(linkAt(screen.getByTestId("paginator"), 4)).toBeNull()
        expect(linkAt(screen.getByTestId("paginator"), 5)).toBeNull()
        expect(linkAt(screen.getByTestId("paginator"), 6)).toBeNull()
      })
    })
  })
})
