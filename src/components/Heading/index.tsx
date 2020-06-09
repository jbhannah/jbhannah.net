import * as React from "react"

const headingCSS = {
  a: {
    background: "none",
    textShadow: "none",
  },
  code: {
    fontSize: "inherit",
  },
}

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type HeadingBaseProps = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLHeadingElement> &
  React.HTMLAttributes<HTMLHeadingElement>

interface HeadingProps extends HeadingBaseProps {
  level: HeadingLevel
}

export const Heading: React.FunctionComponent<HeadingProps> = ({
  level: H,
  ...props
}) => {
  return <H css={headingCSS} {...props} />
}

export const HeadingFactory = (level: HeadingLevel) => (
  props: HeadingBaseProps
) => <Heading level={level} {...props} />

export const H1 = HeadingFactory("h1")
export const H2 = HeadingFactory("h2")
export const H3 = HeadingFactory("h3")
export const H4 = HeadingFactory("h4")
export const H5 = HeadingFactory("h5")
export const H6 = HeadingFactory("h6")
