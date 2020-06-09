import * as React from "react"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"
import { linkColor, mq } from "../../utils/styles"
import { rhythm } from "../../utils/typography"

const borderLeft = (i: number) => `${rhythm(i / 16)} solid ${linkColor}`

const baseBlockquote = {
  borderLeft: borderLeft(3),
  marginLeft: rhythm(-3 / 4),
  paddingLeft: rhythm(9 / 16),
}

const blockquoteCSS = {
  ...baseBlockquote,
  [MOBILE_MEDIA_QUERY]: { ...baseBlockquote },
  [mq.sm]: {
    borderLeft: borderLeft(6),
    marginLeft: 0,
    paddingLeft: rhythm(10 / 16),
  },
}

type BlockquoteProps = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLElement> &
  React.BlockquoteHTMLAttributes<HTMLElement>

export const Blockquote: React.FunctionComponent<BlockquoteProps> = (props) => (
  <blockquote css={blockquoteCSS} {...props} />
)
