import React from "react"

const codeCSS = {
  fontFamily: "Hack, monospace !important",
  fontFeatureSettings: '"liga" 0 !important',
  MozFontFeatureSettings: '"liga" 0 !important',
  WebkitFontFeatureSettings: '"liga" 0 !important',
}

const Code = props => <code css={codeCSS} {...props} />

export default Code
