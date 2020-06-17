import Typography, { TypographyOptions } from "typography"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"
import lincolnTheme from "typography-theme-lincoln"
import { mq } from "./styles"

const theme: TypographyOptions = {
  ...lincolnTheme,
  baseFontSize: "16px",
  bodyFontFamily: ["Libre Caslon Text", "serif"],
}

theme.overrideThemeStyles = ({ adjustFontSizeTo, rhythm }) => ({
  html: {
    ...adjustFontSizeTo("17px"),
  },
  "h1,h2,h3,h4,h5,h6": {
    marginBottom: rhythm(1),
  },
  [MOBILE_MEDIA_QUERY]: null,
  [mq.sm]: {
    html: {
      ...adjustFontSizeTo("16px"),
    },
  },
})

const typography = new Typography(theme)
const { rhythm, scale } = typography

export { rhythm, scale, typography as default }
