import PropTypes from "prop-types"
import React from "react"
import { contentWidthColumn, headerWidth, mq } from "../../utils/styles"
import Link from "../Link"

const year = new Date().getFullYear()

const Footer = ({ title }) => (
  <footer
    css={[
      contentWidthColumn,
      {
        alignSelf: "flex-end",
        fontSize: "0.75rem",
        margin: "1rem auto",
        [mq.lg]: { marginLeft: headerWidth },
        [mq.xl]: { marginLeft: 0 },
      },
    ]}
  >
    <div>
      Copyright © {year} <Link href="/">{title}</Link>.{" "}
      <Link
        href="https://creativecommons.org/licenses/by-sa/4.0/"
        rel="license"
      >
        Some Rights Reserved
      </Link>
      .{" "}
      <Link href="https://github.com/jbhannah/jbhannah.net">
        Source on GitHub
      </Link>
      .
    </div>
  </footer>
)

Footer.propTypes = {
  title: PropTypes.string,
}

export default Footer
