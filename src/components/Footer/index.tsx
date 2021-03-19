import * as React from "react"
import { Link } from "../Link"
import * as style from "./index.module.less"

interface FooterProps {
  fullname: string | null
  pronouns: string | null
}

const year = new Date().getFullYear()

const Footer: React.FunctionComponent<FooterProps> = ({
  fullname,
  pronouns,
}) => (
  <footer className={style.footer}>
    <div>
      Copyright © {year} <Link href="/">{fullname}</Link> ({pronouns}).{" "}
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

export default Footer
