import PropTypes from "prop-types"
import React from "react"
import Link from "../Link"

const year = new Date().getFullYear()

const Footer = ({ title, className }) => (
  <footer className={className}>
    <div>
      Copyright © {year} <Link href="/">{title}</Link>.{" "}
      <Link
        href="https://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank"
        rel="license"
      >
        Some Rights Reserved
      </Link>
      .{" "}
      <Link href="https://github.com/jbhannah/jbhannah.net" target="_blank">
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
