import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import github from '../../images/github.svg'
import linkedin from '../../images/linkedin.svg'
import twitter from '../../images/twitter.svg'

const Header = ({ title, className }) => (
  <header className={className}>
    <h1>
      <Link to="/">
        {title}
      </Link>
    </h1>
    <ul>
      <li>
        <a href="https://github.com/jbhannah" target="_blank">
          <img alt="jbhannah on GitHub" src={github} />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/jbhannah" target="_blank">
          <img alt="jbhannah on LinkedIn" src={linkedin} />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/jbhannah" target="_blank">
          <img alt="@jbhannah on Twitter" src={twitter} />
        </a>
      </li>
    </ul>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
