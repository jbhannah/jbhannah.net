import { Global as EmotionGlobal } from "@emotion/core"
import * as React from "react"
import { mq } from "../../utils/styles"
import { rhythm } from "../../utils/typography"

const Global = () => (
  <EmotionGlobal
    styles={{
      ".gatsby-highlight": {
        backgroundColor: "#fdf6e3",
        borderRadius: "0.3em",
        marginBottom: rhythm(1),
        padding: "1em",
        overflow: "auto",
        "& pre[class*=language-]": {
          backgroundColor: "transparent",
          margin: 0,
          padding: "0 1em 0 0",
          overflow: "initial",
          float: "left",
          minWidth: "100%",
          "&.line-numbers": {
            paddingLeft: "2.8em",
            "& .line-numbers-rows span": {
              lineHeight: 1.5,
            },
            ".gatsby-highlight-code-line": {
              marginLeft: "-3.8em",
              paddingLeft: "3.7em",
            },
          },
        },
        ".command-line-prompt": {
          borderRight: "none",
          marginRight: 0,
          ">": {
            "span[data-user]:before": {
              content: "'$'",
              [mq.lg]: {
                content: "'[' attr(data-user) '@' attr(data-host) '] $'",
              },
            },
            "span[data-user='root']:before": {
              content: "'#'",
              [mq.lg]: {
                content: "'[' attr(data-user) '@' attr(data-host) '] #'",
              },
            },
          },
        },
      },
      ".gatsby-highlight-code-line": {
        backgroundColor: "#feb",
        display: "block",
        marginRight: "-2em",
        marginLeft: "-1em",
        paddingRight: "1em",
        paddingLeft: "0.75em",
        borderLeft: "0.25em solid #f99",
      },
      ".footnotes": {
        "p:last-of-child": {
          display: "inline",
        },
      },
    }}
  />
)

export default Global
