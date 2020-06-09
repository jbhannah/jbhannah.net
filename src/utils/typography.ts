import verticalRhythm from "compass-vertical-rhythm"
import Typography from "typography"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"
import lincolnTheme from "typography-theme-lincoln"
import { mq } from "./styles"

lincolnTheme.baseFontSize = "16px"
lincolnTheme.googleFonts = []

const vr = (size = lincolnTheme.baseFontSize) =>
  verticalRhythm({
    baseFontSize: size,
    baseLineHeight: lincolnTheme.baseLineHeight,
  })

lincolnTheme.overrideThemeStyles = () => {
  const html = { ...vr("17px").establishBaseline() }

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

const typography = new Typography(lincolnTheme)
const { rhythm, scale } = typography

export { rhythm, scale, typography as default }