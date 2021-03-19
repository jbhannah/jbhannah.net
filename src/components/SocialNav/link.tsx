import styled, { CSSObject } from "@emotion/styled"
import * as React from "react"
import { hoverRadius, mq } from "../../utils/styles"
import { Link as _Link } from "../Link"

const LI = styled.li({
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
})

const Link = styled(_Link)({
  background: "none",
  display: "block",
  height: "100%",
  width: "100%",
})

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
  const Icon = styled(
    require(`../../assets/images/${service.toLowerCase()}.svg`)
  )(socialLinkImgCSS)

  return (
    <LI>
      <Link title={`${name} on ${service}`} href={link}>
        <Icon />
      </Link>
    </LI>
  )
}
