import styled from "@emotion/styled"
import * as React from "react"

const _Code = styled.code({
  fontFamily: "JetBrainsMono, monospace !important",
  fontSize: "0.95rem",
  WebkitFontSmoothing: "antialiased",
  textRendering: "optimizeLegibility",
})

type CodeProps = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement>

export const Code: React.FunctionComponent<CodeProps> = (props) => (
  <_Code {...props} />
)
