import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const year = new Date().getFullYear()

const Footer = ({ title, className }) => (
  <footer className={className}>
    <div>
      Copyright © {year} <Link to="/">{title}</Link>.{" "}
      <a
        href="https://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank"
        rel="license"
      >
        Some Rights Reserved
      </a>
      .{" "}
      <a href="https://github.com/jbhannah/jbhannah.net" target="_blank">
        Source on GitHub
      </a>
      .
    </div>
  </footer>
)

Footer.propTypes = {
  title: PropTypes.string,
}

export default Footer
