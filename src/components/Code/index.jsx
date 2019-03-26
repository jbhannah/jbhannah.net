import React from "react"

const styles = {
  fontFamily: "Hack, monospace !important",
  fontFeatureSettings: '"liga" 0 !important',
  MozFontFeatureSettings: '"liga" 0 !important',
  WebkitFontFeatureSettings: '"liga" 0 !important',
}

const Code = props => <code css={styles} {...props} />

export default Code
