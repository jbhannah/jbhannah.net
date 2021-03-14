/** @jsx jsx */
import { CSSObject, jsx } from "@emotion/react"
import * as React from "react"

const codeCSS: CSSObject = {
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
