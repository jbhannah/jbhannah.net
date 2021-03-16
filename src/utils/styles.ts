import { CSSObject } from "@emotion/react"

export const breakpoints = { sm: 28, md: 38, lg: 59, xl: 70 }
export const mq = Object.assign(
  {},
  ...Object.entries(breakpoints).map(([k, v]) => ({
    [k]: `@media only screen and (min-width: ${v}rem)`,
  }))
)

export const contentWidth = "42rem"
export const headerWidth = "12rem"
export const linkColor = "#447011"

export const contentWidthColumn: CSSObject = {
  margin: "0 auto",
  maxWidth: contentWidth,
  padding: "0 1rem",
  width: "100%",
}

export const hoverRadius: CSSObject = {
  transition: "border-radius 0.5s",
  borderRadius: "50%",
  "a:hover > &": {
    borderRadius: "15%",
  },
}
