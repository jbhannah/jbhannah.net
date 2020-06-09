import { InterpolationWithTheme } from "@emotion/core"
import * as React from "react"
import { hoverRadius, mq } from "../../utils/styles"
import { Link } from "../Link"

const socialLinkCSS: InterpolationWithTheme<any> = {
  float: "right",
  marginBottom: 0,
  marginRight: "0.5rem",
  width: "1.25rem",
  height: "1.25rem",
  "&:last-child": {
    marginRight: 0,
  },
  [mq.lg]: {
    height: "1.5rem",
    width: "1.5rem",
  },
}

const socialLinkLinkCSS: InterpolationWithTheme<any> = {
  background: "none",
  display: "block",
  height: "100%",
  width: "100%",
}

const socialLinkImgCSS: InterpolationWithTheme<any> = {
  display: "block",
  height: "100%",
  margin: 0,
  width: "100%",
  ...hoverRadius,
}

interface SocialLinkProps {
  service: string
  link: string
  name: string
}

export const SocialLink: React.FunctionComponent<SocialLinkProps> = ({
  service,
  link,
  name,
}) => (
  <li css={socialLinkCSS}>
    <Link css={socialLinkLinkCSS} href={link}>
      <img
        css={socialLinkImgCSS}
        alt={`${name} on ${service}`}
        src={require(`../../images/${service.toLowerCase()}.svg`)}
      />
    </Link>
  </li>
)