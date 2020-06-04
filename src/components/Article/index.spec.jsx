import { shallow } from "enzyme"
import React from "react"
import Article from "."
import excerpt from "../../utils/excerpt"

jest.mock("../../utils/excerpt")

const article = {
  fields: {
    slug: "/test-slug",
    title: "Test Article",
  },
  frontmatter: {
    date: "2019-02-05T01:17:07.551Z",
  },
  htmlAst: {
    excerpted: false,
  },
  timeToRead: 5,
}

const site = {
  siteMetadata: {
    title: "Test Site",
  },
}

const linkArticle = Object.assign({}, article, {
  frontmatter: { link: "https://example.com/test-link" },
})

const TestArticle = (props) => shallow(<Article {...props} />)

describe("Article", () => {
  describe("standalone", () => {
    const tree = TestArticle({ article, site })
    expect(excerpt).not.toBeCalled()

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("displays the article title in an h1", () => {
      const heading = tree.find("header > Heading")
      expect(heading.prop("level")).toBe("h1")
      expect(heading.render().text()).toBe("Test Article")
    })

    it("does not display the article title as a link", () => {
      const heading = tree.find("header > Heading")
      expect(heading.children("Link")).toHaveLength(0)
    })

    it("displays the publication date", () => {
      const time = tree.find("time")
      expect(time.prop("dateTime")).toEqual("2019-02-05T01:17:07.551Z")
      expect(time.text()).toEqual("Monday, February 4, 2019")
    })

    it("renders the non-excerpted body", () => {
      expect(tree.find("Markdown").prop("htmlAst")).toHaveProperty(
        "excerpted",
        false
      )
    })

    it("does not render a footer", () => {
      expect(tree.find("footer")).toHaveLength(0)
    })

    describe("with a link", () => {
      const tree = TestArticle({ article: linkArticle, site })

      it("displays the article title as a link", () => {
        const title = tree.find("header > Heading > Link")
        expect(title.prop("href")).toBe("https://example.com/test-link")
      })
    })
  })

  describe("in a list", () => {
    const tree = TestArticle({ article, site, list: true })
    expect(excerpt).toBeCalled()

    it("renders correctly", () => {
      expect(tree).toMatchSnapshot()
    })

    it("displays the article title in an h2", () => {
      const heading = tree.find("header > Heading")
      expect(heading.prop("level")).toBe("h2")
      expect(heading.render().text()).toBe("Test Article")
    })

    it("displays the article title as a link", () => {
      const title = tree.find("header > Heading > Link")
      expect(title.prop("href")).toBe("/test-slug")
      expect(title.render().text()).toBe("Test Article")
    })

    it("renders the excerpted body", () => {
      expect(tree.find("Markdown").prop("htmlAst")).toHaveProperty(
        "excerpted",
        true
      )
    })

    it('renders a footer with "Read More…" link', () => {
      const footer = tree.find("footer")
      expect(footer.find("Link").prop("href")).toBe("/test-slug")
      expect(footer.render().text()).toBe("Read More…")
    })

    describe("with a link", () => {
      const tree = TestArticle({ article: linkArticle, site, list: true })

      it("displays the article title as a link", () => {
        const title = tree.find("header > Heading > Link")
        expect(title.prop("href")).toBe("https://example.com/test-link")
      })

      it('renders a footer with "Permalink" link', () => {
        const footer = tree.find("footer")
        expect(footer.find("Link").prop("href")).toBe("/test-slug")
        expect(footer.render().text()).toBe("Permalink")
      })
    })
  })
})
