import PropTypes from "prop-types"
import React from "react"
import Link from "../Link"

const year = new Date().getFullYear()

const Footer = ({ title }) => (
  <footer>
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
