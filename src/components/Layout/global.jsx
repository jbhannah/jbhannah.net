import { Global as EmotionGlobal } from "@emotion/core"
import React from "react"

const Global = () => (
  <EmotionGlobal
    styles={{
      ".gatsby-highlight": {
        backgroundColor: "#fdf6e3",
        borderRadius: "0.3em",
        marginBottom: "1.58em",
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
    }}
  />
)

export default Global
