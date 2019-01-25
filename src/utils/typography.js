import "hack-font/build/web/hack.css"
import "prismjs/themes/prism-solarizedlight.css"
import "typeface-lora"
import "typeface-varela-round"
import Typography from "typography"
import lincolnTheme from "typography-theme-lincoln"

lincolnTheme.baseFontSize = "16px"
lincolnTheme.googleFonts = []
lincolnTheme.overrideThemeStyles = ({ rhythm }, options, styles) => ({
  a: {
    borderRadius: "0.3em",
  },
  "a code": {
    textShadow: "none",
  },
  "code[class*=language-], pre[class*=language-]": {
    fontFamily: "Hack",
    fontFeatureSettings: '"liga" 0',
    MozFontFeatureSettings: '"liga" 0',
    WebkitFontFeatureSettings: '"liga" 0',
  },
})

const typography = new Typography(lincolnTheme)
const { rhythm, scale } = typography

export { rhythm, scale, typography as default }
