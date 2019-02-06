export const breakpoints = { sm: 28, md: 38, lg: 59, xl: 70 }
export const mq = Object.assign(
  ...Object.entries(breakpoints).map(([k, v]) => ({
    [k]: `@media only screen and (min-width: ${v}rem)`,
  }))
)

export const contentWidth = "42rem"
export const headerWidth = "12rem"
export const linkColor = "#0f7b3b"

export const contentWidthColumn = {
  margin: "0 auto",
  maxWidth: contentWidth,
  padding: "0 1rem",
  width: "100%",
}
