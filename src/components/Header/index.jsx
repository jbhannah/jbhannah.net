import PropTypes from "prop-types"
import React from "react"
import { contentWidth, headerWidth, hoverRadius, mq } from "../../utils/styles"
import Heading from "../Heading"
import Link from "../Link"
import SocialNav from "../SocialNav"

const headerCSS = {
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
}

const titleCSS = {
  fontSize: "1.15rem",
  [mq.sm]: {
    fontSize: "1.25rem",
  },
}

const avatarCSS = {
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
}

const Header = ({ title, avatar, socialLinks }) => (
  <header css={headerCSS}>
    <Heading level="h1" css={titleCSS}>
      <Link href="/" css={{ display: "block" }}>
        <picture css={avatarCSS}>
          <source type="image/webp" srcSet={avatar.srcSetWebp} />
          <source type="image/png" srcSet={avatar.srcSet} />
          <img src={avatar.src} alt={title} />
        </picture>
        {title}
      </Link>
    </Heading>
    <SocialNav {...{ socialLinks }} />
  </header>
)

export default Header

Header.propTypes = {
  title: PropTypes.string,
  avatar: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    srcSetWebp: PropTypes.string,
  }),
  socialLinks: SocialNav.propTypes.socialLinks,
}
