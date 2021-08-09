import styled from "@emotion/styled"
import * as React from "react"
import { contentWidthColumn, headerWidth, mq } from "../../utils/styles"
import { Link } from "../Link"

interface FooterProps {
  fullname: string | null
  pronouns: string | null
}

const year = new Date().getFullYear()

const _Footer = styled.footer({
  ...contentWidthColumn,
  alignSelf: "flex-end",
  fontSize: "0.75rem",
  margin: "1rem auto",
  [mq.lg]: { marginLeft: headerWidth },
  [mq.xl]: { marginLeft: 0 },
})

const Footer: React.FunctionComponent<FooterProps> = ({
  fullname,
  pronouns,
}) => (
  <_Footer>
    <div>
      Copyright © {year} <Link href="/">{fullname}</Link> ({pronouns}).{" "}
      <Link
        href="https://creativecommons.org/licenses/by-sa/4.0/"
        rel="license"
      >
        Some Rights Reserved
      </Link>
      . Emoji by <Link href="https://twemoji.twitter.com/">Twemoji</Link>.
      <Link href="https://github.com/jbhannah/jbhannah.net">
        Source on GitHub
      </Link>
      .
    </div>
  </_Footer>
)

export default Footer
