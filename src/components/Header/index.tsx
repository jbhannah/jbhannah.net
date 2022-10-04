import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { contentWidth, headerWidth, hoverRadius, mq } from "../../utils/styles"
import { rhythm } from "../../utils/typography"
import { H1 as _H1 } from "../Heading"
import { Link as _Link } from "../Link"
import { SocialNav } from "../SocialNav"
import { HeaderQuery } from "./__generated__/HeaderQuery"

interface HeaderProps {
  title: string
  fullname: string
  pronouns: string
}

const _Header = styled.header({
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
    textAlign: "center",
    width: headerWidth,
  },
  [mq.xl]: {
    marginLeft: `-${headerWidth}`,
  },
})

const H1 = styled(_H1)({
  fontSize: "1.15rem",
  marginBottom: rhythm(1 / 2),
  small: {
    marginTop: rhythm(1 / 4),
    display: "block",
  },
  [mq.sm]: {
    fontSize: "1.25rem",
  },
})

const Link = styled(_Link)({
  display: "block",
})

const Avatar = styled.picture({
  display: "none",
  [mq.lg]: {
    display: "block",
    width: "100%",
    marginBottom: rhythm(1 / 2),
    "source, img": {
      ...hoverRadius,
      display: "block",
      margin: 0,
    },
  },
})

export const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  fullname,
  pronouns,
  ...props
}) => {
  const {
    file: {
      childImageSharp: {
        gatsbyImageData: { images: avatar },
      },
    },
  } = useStaticQuery<HeaderQuery>(query)

  return (
    <_Header {...props}>
      <H1>
        <Link href="/">
          <Avatar>
            {avatar.sources.map((src, i) => (
              <source key={i} type={src.type} srcSet={src.srcSet} />
            ))}
            <img src={avatar.fallback.src} alt={title} />
          </Avatar>
          {fullname}
          <small>({pronouns})</small>
        </Link>
      </H1>
      <SocialNav />
    </_Header>
  )
}

const query = graphql`
  query HeaderQuery {
    file(
      relativePath: { eq: "images/avatar.png" }
      sourceInstanceName: { eq: "assets" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 160)
      }
    }
  }
`
