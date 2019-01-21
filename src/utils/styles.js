export const breakpoints = { sm: 28, md: 38, lg: 59, xl: 70 }
export const mq = Object.assign(
  ...Object.entries(breakpoints).map(([k, v]) => ({
    [k]: `@media only screen and (min-width: ${v}rem)`,
  }))
)

export const contentWidth = "42rem"
export const headerWidth = "12rem"
