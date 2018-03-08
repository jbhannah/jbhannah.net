import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const Header = ({ title, className }) => (
  <header className={className}>
    <div>
      <h1>
        <Link to="/">
          {title}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
