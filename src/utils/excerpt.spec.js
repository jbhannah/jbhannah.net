import visit from "unist-util-visit"
import { defaultFrontmatter } from "../../lib/frontmatter"
import excerpt from "./excerpt"

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
        {
          type: "element",
          tagName: "sup",
          children: [
            {
              type: "element",
              tagName: "a",
              properties: {
                href: "#fn-1",
              },
              children: [{ type: "text", value: "1" }],
            },
          ],
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

const itStripsFootnotes = ex => {
  return () => {
    visit(ex, node => {
      if (node.hasOwnProperty("tagName")) {
        expect(node.tagName).not.toBe("sup")
      }

      return visit.CONTINUE
    })
  }
}

describe("excerpt", () => {
  describe("without link", () => {
    const ex = excerpt({ htmlAst, frontmatter: defaultFrontmatter })

    it("returns only the first paragraph", () => {
      expect(ex.children).toHaveLength(1)
      expect(ex.children[0].tagName).toBe("p")
    })

    it("strips all footnote links", itStripsFootnotes(ex))
  })

  describe("with link", () => {
    const ex = excerpt({
      htmlAst,
      frontmatter: { ...defaultFrontmatter, link: "https://www.example.com" },
    })

    it("returns the whole article", () => {
      expect(ex.children).toHaveLength(htmlAst.children.length)
    })

    it("strips all footnote links", itStripsFootnotes(ex))
  })
})
