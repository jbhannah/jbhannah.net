import verticalRhythm from "compass-vertical-rhythm"
import Typography, { TypographyOptions } from "typography"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"
import lincolnTheme from "typography-theme-lincoln"
import { mq } from "./styles"

const theme: TypographyOptions = {
  ...lincolnTheme,
  baseFontSize: "16px",
  bodyFontFamily: ["Libre Caslon Text", "serif"],
}

const vr = (size = theme.baseFontSize) =>
  verticalRhythm({
    baseFontSize: size,
    baseLineHeight: theme.baseLineHeight,
  })

theme.overrideThemeStyles = () => {
  const html = { ...vr().establishBaseline() }

  return {
    html,
    [MOBILE_MEDIA_QUERY]: {
      html,
    },
    [mq.sm]: {
      html: {
        ...vr().establishBaseline(),
      },
    },
  }
}

const typography = new Typography(theme)
const { rhythm, scale } = typography

export { rhythm, scale, typography as default }
