import "prismjs/plugins/command-line/prism-command-line.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/themes/prism-solarizedlight.css"
import "typeface-lora"
import "typeface-lora/files/lora-latin-400.woff2"
import "typeface-lora/files/lora-latin-400italic.woff2"
import "typeface-lora/files/lora-latin-700.woff2"
import "typeface-lora/files/lora-latin-700italic.woff2"
import "typeface-varela-round"
import "typeface-varela-round/files/varela-round-latin-400.woff2"
import "../fonts/jetbrains-mono.css"
import "../fonts/jetbrainsmono-regular.woff2"

export const breakpoints = { sm: 28, md: 38, lg: 59, xl: 70 }
export const mq = Object.assign(
  {},
  ...Object.entries(breakpoints).map(([k, v]) => ({
    [k]: `@media only screen and (min-width: ${v}rem)`,
  }))
)

export const contentWidth = "42rem"
export const headerWidth = "12rem"
export const linkColor = "#247829"

export const contentWidthColumn = {
  margin: "0 auto",
  maxWidth: contentWidth,
  padding: "0 1rem",
  width: "100%",
}

export const hoverRadius = {
  transition: "border-radius 0.5s",
  borderRadius: "50%",
  "a:hover > &": {
    borderRadius: "15%",
  },
}
