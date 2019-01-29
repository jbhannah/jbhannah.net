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

export const linkColor = "#0f7b3b"

lincolnTheme.baseFontSize = "16px"
lincolnTheme.googleFonts = []
lincolnTheme.overrideThemeStyles = ({ rhythm }) => ({
  a: {
    color: linkColor,
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`,
  },
  blockquote: {
    borderLeft: `${rhythm(3 / 16)} solid ${linkColor}`,
    marginLeft: rhythm(-3 / 4),
    paddingLeft: rhythm(9 / 16),
  },
  "code[class*=language-], pre[class*=language-]": {
    fontFamily: "Hack, monospace",
    fontFeatureSettings: '"liga" 0',
    MozFontFeatureSettings: '"liga" 0',
    WebkitFontFeatureSettings: '"liga" 0',
  },
  [MOBILE_MEDIA_QUERY]: {
    blockquote: {
      borderLeft: `${rhythm(3 / 16)} solid ${linkColor}`,
      marginLeft: rhythm(-3 / 4),
      paddingLeft: rhythm(9 / 16),
    },
  },
  [mq.sm]: {
    blockquote: {
      borderLeft: `${rhythm(6 / 16)} solid ${linkColor}`,
      marginLeft: 0,
      paddingLeft: rhythm(10 / 16),
    },
  },
})

const typography = new Typography(lincolnTheme)
const { rhythm, scale } = typography

export { rhythm, scale, typography as default }
