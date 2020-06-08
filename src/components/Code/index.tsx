import * as React from "react"

const codeCSS = {
  fontFamily: "JetBrainsMono, monospace !important",
  WebkitFontSmoothing: "antialiased",
  textRendering: "optimizeLegibility",
}

const Code = (props) => <code css={codeCSS} {...props} />

export default Code
