import { InterpolationWithTheme } from "@emotion/core"
import PropTypes from "prop-types"
import * as React from "react"
import { hoverRadius, mq } from "../../utils/styles"
import Link from "../Link"

const socialNavCSS: InterpolationWithTheme<any> = {
  marginTop: "2.37rem",
  [mq.lg]: {
    marginTop: 0,
  },
}

const socialNavUlCSS: InterpolationWithTheme<any> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  listStyleType: "none",
  margin: 0,
  [mq.lg]: {
    justifyContent: "center",
  },
}

const SocialNav = ({ socialLinks }) => (
  <nav css={socialNavCSS}>
    <ul css={socialNavUlCSS}>
      {socialLinks.map((l) => (
        <SocialLink {...l} />
      ))}
    </ul>
  </nav>
)

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

const SocialLink = ({ service, link, name }) => (
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

export default SocialNav

SocialNav.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      service: PropTypes.string,
      link: PropTypes.string,
      name: PropTypes.string,
    })
  ),
}
