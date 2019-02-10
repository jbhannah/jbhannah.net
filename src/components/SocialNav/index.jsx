import PropTypes from "prop-types"
import React from "react"
import { mq } from "../../utils/styles"
import Link from "../Link"

const SocialNav = ({ socialLinks }) => (
  <nav
    css={{
      marginTop: "2.37rem",
      [mq.lg]: {
        marginTop: 0,
      },
    }}
  >
    <ul
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        listStyleType: "none",
        margin: 0,
      }}
    >
      {socialLinks.map(l => (
        <SocialLink {...l} />
      ))}
    </ul>
  </nav>
)

const SocialLink = ({ service, link, name }) => (
  <li
    css={{
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
    }}
  >
    <Link
      css={{
        background: "none",
        display: "block",
        height: "100%",
        width: "100%",
      }}
      href={link}
    >
      <img
        css={{
          transition: "border-radius 0.5s",
          borderRadius: "50%",
          display: "block",
          height: "100%",
          margin: 0,
          width: "100%",
          "a:hover > &": {
            borderRadius: "15%",
          },
        }}
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
