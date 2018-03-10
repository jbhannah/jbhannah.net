import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import styles from './styles.module.css'

import github from '../../images/github.svg'
import keybase from '../../images/keybase.svg'
import linkedin from '../../images/linkedin.svg'
import twitter from '../../images/twitter.svg'

const Header = ({ title }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>
      <Link to="/">
        {title}
      </Link>
    </h1>
    <ul className={styles.iconList}>
      <li className={styles.icon}>
        <a href="https://github.com/jbhannah" target="_blank">
          <img alt="jbhannah on GitHub" src={github} />
        </a>
      </li>
      <li className={styles.icon}>
        <a href="https://keybase.io/jbhannah" target="_blank">
          <img alt="jbhannah on Keybase" src={keybase} />
        </a>
      </li>
      <li className={styles.icon}>
        <a href="https://www.linkedin.com/in/jbhannah" target="_blank">
          <img alt="jbhannah on LinkedIn" src={linkedin} />
        </a>
      </li>
      <li className={styles.icon}>
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
