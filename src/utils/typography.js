import Typography from "typography"
import lincolnTheme from "typography-theme-lincoln"

lincolnTheme.baseFontSize = "16px"
lincolnTheme.googleFonts = []
lincolnTheme.overrideThemeStyles = () => ({
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
