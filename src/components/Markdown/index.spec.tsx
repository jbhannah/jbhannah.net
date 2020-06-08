import { mount } from "enzyme"
import * as React from "react"
import Markdown from "."

const htmlAst = {
  type: "root",
  children: [
    {
      type: "element",
      tagName: "p",
      properties: {},
      children: [
        {
          type: "text",
          value: "Test paragraph.",
        },
      ],
    },
    {
      type: "element",
      tagName: "h2",
      properties: {},
      children: [
        {
          type: "text",
          value: "Test heading",
        },
      ],
    },
    {
      type: "element",
      tagName: "blockquote",
      properties: {},
      children: [
        {
          type: "element",
          tagName: "p",
          children: [
            {
              type: "text",
              value: "Test blockquote",
            },
          ],
        },
      ],
    },
    {
      type: "element",
      tagName: "h3",
      properties: {},
      children: [
        {
          type: "text",
          value: "Test subheading",
        },
      ],
    },
    {
      type: "element",
      tagName: "a",
      properties: {
        href: "https://www.example.com",
      },
      children: [
        {
          type: "text",
          value: "Test link",
        },
      ],
    },
    {
      type: "element",
      tagName: "p",
      properties: {},
      children: [
        {
          type: "text",
          value: "Test paragraph 2.",
        },
      ],
    },
    {
      type: "element",
      tagName: "h2",
      properties: {},
      children: [
        {
          type: "text",
          value: "Test heading 2",
        },
      ],
    },
    {
      type: "element",
      tagName: "p",
      properties: {},
      children: [
        {
          type: "text",
          value: "Test paragraph 3.",
        },
      ],
    },
    {
      type: "element",
      tagName: "div",
      properties: {
        class: "footnotes",
      },
      children: [
        {
          type: "text",
          value: "Test footnotes.",
        },
      ],
    },
  ],
  data: {
    quirksMode: false,
  },
}

const TestMarkdown = (props) => mount(<Markdown {...props} />)

describe("Markdown", () => {
  describe("without a root element", () => {
    const tree = TestMarkdown({ htmlAst })
    const headings = tree.find("Heading")

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("renders <h#> tags as <Heading> components", () => {
      expect(headings).toHaveLength(3)
      expect(headings.find("h2")).toHaveLength(2)
      expect(headings.find("h3")).toHaveLength(1)
    })

    it("renders <a> tags as <Link> components", () => {
      expect(tree.find("Link")).toHaveLength(1)
    })

    it("wraps contents after headings in <section> tags", () => {
      expect(tree.children("section")).toHaveLength(2)
      expect(tree.find("section")).toHaveLength(3)
    })
  })

  describe("with a root element", () => {
    const tree = TestMarkdown({ htmlAst, root: "article" })

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("wraps the tree in the specified element", () => {
      expect(tree.children("article")).toHaveLength(1)
    })
  })
})
