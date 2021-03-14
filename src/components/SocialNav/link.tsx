/** @jsx jsx */
import { CSSObject, jsx } from "@emotion/react"
import * as React from "react"
import { hoverRadius, mq } from "../../utils/styles"
import { Link } from "../Link"

const socialLinkCSS: CSSObject = {
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

const socialLinkLinkCSS: CSSObject = {
  background: "none",
  display: "block",
  height: "100%",
  width: "100%",
}

const socialLinkImgCSS: CSSObject = {
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
}) => {
  const Icon = require(`../../assets/images/${service.toLowerCase()}.svg`)

  return (
    <li css={socialLinkCSS}>
      <Link css={socialLinkLinkCSS} title={`${name} on ${service}`} href={link}>
        <Icon css={socialLinkImgCSS} />
      </Link>
    </li>
  )
}
