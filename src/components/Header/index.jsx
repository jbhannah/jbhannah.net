import PropTypes from "prop-types"
import React from "react"
import avatar from "../../images/avatar.png"
import avatarWebp from "../../images/avatar.webp"
import { contentWidth, headerWidth, hoverRadius, mq } from "../../utils/styles"
import Heading from "../Heading"
import Link from "../Link"
import SocialNav from "../SocialNav"

const Header = ({ title, socialLinks }) => (
  <header
    css={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      margin: "0 auto",
      maxWidth: contentWidth,
      padding: "0 1rem",
      width: "100%",
      [mq.lg]: {
        flexDirection: "column",
        justifyContent: "flex-start",
        margin: 0,
        textAlign: "center",
        width: headerWidth,
      },
      [mq.xl]: {
        marginLeft: `-${headerWidth}`,
      },
    }}
  >
    <Heading
      level="h1"
      css={{
        fontSize: "1.15rem",
        [mq.sm]: {
          fontSize: "1.25rem",
        },
      }}
    >
      <Link href="/" css={{ display: "block" }}>
        <picture
          css={{
            display: "none",
            [mq.lg]: {
              display: "block",
              width: "100%",
              marginBottom: "0.79rem",
              "source, img": {
                ...hoverRadius,
                display: "block",
                margin: 0,
              },
            },
          }}
        >
          <source type="image/webp" srcSet={avatarWebp} />
          <source type="image/png" srcSet={avatar} />
          <img src={avatar} alt={title} />
        </picture>
        {title}
      </Link>
    </Heading>
    <SocialNav {...{ socialLinks }} />
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
  socialLinks: SocialNav.propTypes.socialLinks,
}

export default Header
