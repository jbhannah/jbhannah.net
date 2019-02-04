import PropTypes from "prop-types"
import React from "react"
import github from "../../images/github.svg"
import keybase from "../../images/keybase.svg"
import linkedin from "../../images/linkedin.svg"
import twitter from "../../images/twitter.svg"
import { contentWidth, headerWidth, mq } from "../../utils/styles"
import Heading from "../Heading"
import Link from "../Link"

const Header = ({ title }) => (
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
        textAlign: "right",
        width: headerWidth,
      },
      [mq.xl]: {
        marginLeft: `calc(-1 * ${headerWidth})`,
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
      <Link to="/">{title}</Link>
    </Heading>
    <ul
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        listStyleType: "none",
        margin: 0,
        marginTop: "2.37rem",
        "& li": {
          float: "right",
          marginBottom: 0,
          marginRight: "0.5rem",
          width: "1.25rem",
          height: "1.25rem",
          "&:last-child": {
            marginRight: 0,
          },
          "& a": {
            background: "none",
            display: "block",
            height: "100%",
            width: "100%",
          },
          "& img": {
            transition: "border-radius 0.5s",
            borderRadius: "50%",
            display: "block",
            height: "100%",
            margin: 0,
            width: "100%",
          },
          "&:hover img": {
            borderRadius: "15%",
          },
        },
        [mq.lg]: {
          marginTop: 0,
          "& li": {
            height: "1.5rem",
            width: "1.5rem",
          },
        },
      }}
    >
      <li>
        <Link href="https://github.com/jbhannah" target="_blank">
          <img alt="jbhannah on GitHub" src={github} />
        </Link>
      </li>
      <li>
        <Link href="https://keybase.io/jbhannah" target="_blank">
          <img alt="jbhannah on Keybase" src={keybase} />
        </Link>
      </li>
      <li>
        <Link href="https://www.linkedin.com/in/jbhannah" target="_blank">
          <img alt="jbhannah on LinkedIn" src={linkedin} />
        </Link>
      </li>
      <li>
        <Link href="https://twitter.com/jbhannah" target="_blank">
          <img alt="@jbhannah on Twitter" src={twitter} />
        </Link>
      </li>
    </ul>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
