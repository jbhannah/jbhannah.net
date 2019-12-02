import React from "react"
import { Global as EmotionGlobal } from "@emotion/core"

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
          },
        },
      },
      ".gatsby-highlight-code-line": {
        backgroundColor: "#feb",
        display: "block",
        marginRight: "-2.2em",
        marginLeft: "-1.2em",
        paddingRight: "1em",
        paddingLeft: "0.9em",
        borderLeft: "0.3em solid #f99",
      },
    }}
  />
)

export default Global
