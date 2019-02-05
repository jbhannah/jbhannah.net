import React from "react"
import Link from "../Link"

const Paginator = ({ base, page, numPages }) => {
  const pageBase = base === "/" ? "/page" : `${base}/page`

  return (
    numPages > 1 && (
      <footer>
        <ul
          css={{
            display: "block",
            listStyleType: "none",
            margin: 0,
            li: {
              display: "inline-block",
              marginBottom: 0,
              marginRight: "1rem",
              a: {
                backgroundImage: "none",
              },
            },
          }}
        >
          <li>{page > 1 ? <Link href={`${base}`}>«</Link> : "«"}</li>
          {Array.from({ length: numPages }).map((_, i) => {
            const pg = i + 1
            return (
              <li key={`paginate-${i}`}>
                {page === pg ? (
                  pg
                ) : (
                  <Link href={i === 0 ? base : `${pageBase}/${pg}`}>{pg}</Link>
                )}
              </li>
            )
          })}
          <li>
            {page < numPages ? (
              <Link href={`${pageBase}/${numPages}`}>»</Link>
            ) : (
              "»"
            )}
          </li>
        </ul>
      </footer>
    )
  )
}

export default Paginator
