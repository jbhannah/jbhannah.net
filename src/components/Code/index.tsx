import { InterpolationWithTheme } from "@emotion/core"
import * as React from "react"

const codeCSS: InterpolationWithTheme<any> = {
  fontFamily: "JetBrainsMono, monospace !important",
  fontSize: "0.95rem",
  WebkitFontSmoothing: "antialiased",
  textRendering: "optimizeLegibility",
}

type CodeProps = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement>

export const Code: React.FunctionComponent<CodeProps> = (props) => (
  <code css={codeCSS} {...props} />
)
