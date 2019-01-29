import verticalRhythm from "compass-vertical-rhythm"
import "hack-font/build/web/fonts/hack-regular-subset.woff"
import "hack-font/build/web/fonts/hack-regular-subset.woff2"
import "hack-font/build/web/hack-subset.css"
import "typeface-lora"
import "typeface-lora/files/lora-latin-400.woff"
import "typeface-lora/files/lora-latin-400.woff2"
import "typeface-lora/files/lora-latin-400italic.woff"
import "typeface-lora/files/lora-latin-400italic.woff2"
import "typeface-lora/files/lora-latin-700.woff"
import "typeface-lora/files/lora-latin-700.woff2"
import "typeface-lora/files/lora-latin-700italic.woff"
import "typeface-lora/files/lora-latin-700italic.woff2"
import "typeface-varela-round"
import "typeface-varela-round/files/varela-round-latin-400.woff"
import "typeface-varela-round/files/varela-round-latin-400.woff2"
import Typography from "typography"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"
import lincolnTheme from "typography-theme-lincoln"
import { mq } from "./styles"

lincolnTheme.baseFontSize = "16px"
lincolnTheme.googleFonts = []
lincolnTheme.overrideThemeStyles = () => {
  const vr = verticalRhythm({
    baseFontSize: "17px",
    baseLineHeight: "28px",
  })
  const html = { ...vr.establishBaseline() }
  return {
    html,
    "code[class*=language-], pre[class*=language-]": {
      fontFamily: "Hack, monospace",
      fontFeatureSettings: '"liga" 0',
      MozFontFeatureSettings: '"liga" 0',
      WebkitFontFeatureSettings: '"liga" 0',
    },
    [MOBILE_MEDIA_QUERY]: {
      html,
    },
    [mq.sm]: {
      html: {
        fontSize: "100%",
      },
    },
  }
}

const typography = new Typography(lincolnTheme)
const { rhythm, scale } = typography

export { rhythm, scale, typography as default }
