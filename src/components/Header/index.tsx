/** @jsx jsx */
import { CSSObject, jsx } from "@emotion/react"
import { graphql, useStaticQuery } from "gatsby"
import { contentWidth, headerWidth, hoverRadius, mq } from "../../utils/styles"
import { rhythm } from "../../utils/typography"
import { H1 } from "../Heading"
import { Link } from "../Link"
import { SocialNav } from "../SocialNav"
import { HeaderQuery } from "./__generated__/HeaderQuery"

const headerCSS: CSSObject = {
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
}

const titleCSS: CSSObject = {
  fontSize: "1.15rem",
  marginBottom: rhythm(1 / 2),
  small: {
    marginTop: rhythm(1 / 4),
    display: "block",
  },
  [mq.sm]: {
    fontSize: "1.25rem",
  },
}

const avatarCSS: CSSObject = {
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
}

interface HeaderProps {
  title: string
  fullname: string
  pronouns: string
}

export const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  fullname,
  pronouns,
}) => {
  const {
    file: {
      childImageSharp: {
        gatsbyImageData: { images: avatar },
      },
    },
  } = useStaticQuery<HeaderQuery>(query)

  return (
    <header css={headerCSS}>
      <H1 css={titleCSS}>
        <Link href="/" css={{ display: "block" }}>
          <picture css={avatarCSS}>
            {avatar.sources.map((src, i) => (
              <source key={i} type={src.type} srcSet={src.srcSet} />
            ))}
            <img src={avatar.fallback.src} alt={title} />
          </picture>
          {fullname}
          <small>({pronouns})</small>
        </Link>
      </H1>
      <SocialNav />
    </header>
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
