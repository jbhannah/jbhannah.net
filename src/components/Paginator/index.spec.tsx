import { shallow } from "enzyme"
import * as React from "react"
import { Paginator } from "."

const lis = (tree) => tree.find("li")
const linkAt = (tree, i) => lis(tree).at(i).find("Link")
const hrefAt = (tree, i) => linkAt(tree, i).prop("href")

const TestPaginator = (props) => shallow(<Paginator {...props} />)

describe("Paginator", () => {
  describe("with one page", () => {
    const tree = TestPaginator({ base: "test", page: 1, numPages: 1 })

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("is empty", () => {
      expect(tree.children()).toHaveLength(0)
    })
  })

  describe("with three pages", () => {
    const base = "/"
    const numPages = 3

    describe("on the first page", () => {
      const tree = TestPaginator({ base, page: 1, numPages })

      it("renders correctly", () => {
        expect(tree).toMatchSnapshot()
      })

      it("contains seven <li> elements", () => {
        expect(lis(tree)).toHaveLength(7)
      })

      it("does not link to the first page", () => {
        expect(tree.find("Link")).toHaveLength(4)
        expect(linkAt(tree, 0)).toHaveLength(0)
        expect(linkAt(tree, 1)).toHaveLength(0)
        expect(linkAt(tree, 2)).toHaveLength(0)
      })

      it("links to the next page", () => {
        expect(hrefAt(tree, 5)).toBe("/page/2")
      })

      it("links to the last page", () => {
        expect(hrefAt(tree, 6)).toBe("/page/3")
      })
    })

    describe("on the last page", () => {
      const tree = TestPaginator({ base, page: 3, numPages })

      it("renders correctly", () => {
        expect(tree).toMatchSnapshot()
      })

      it("links to the first page", () => {
        expect(hrefAt(tree, 0)).toBe("/")
      })

      it("links to the previous page", () => {
        expect(hrefAt(tree, 1)).toBe("/page/2")
      })

      it("does not link to the last page", () => {
        expect(linkAt(tree, 4)).toHaveLength(0)
        expect(linkAt(tree, 5)).toHaveLength(0)
        expect(linkAt(tree, 6)).toHaveLength(0)
      })
    })
  })
})
