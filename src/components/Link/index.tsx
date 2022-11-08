import styled, { CSSObject } from "@emotion/styled"
import { Link as _GatsbyLink } from "gatsby"
import * as React from "react"
import { linkColor } from "../../utils/styles"

const linkCSS: CSSObject = {
  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`,
  borderRadius: "0.3em",
  color: linkColor,
  code: {
    textShadow: "none",
  },
}

const GatsbyLink = styled(_GatsbyLink)(linkCSS)
const A = styled.a(linkCSS)

const domainPattern = new RegExp(/^https?:\/\/(?!jbhannah\.net)/)

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  ...props
}) => {
  if (href.startsWith("/")) {
    return <GatsbyLink to={href} {...props} />
  }

  if (domainPattern.test(href)) {
    const { rel } = props
    if (rel !== "me") props.rel = `${rel ? `${rel} ` : ""}noopener`
    props.target = "_blank"

    props.onClick = () =>
      window.gtag &&
      window.gtag("event", "click", {
        event_category: "outbound",
        event_label: href,
        transport_type: "beacon",
      })
  }

  return <A {...{ href, ...props }} />
}
