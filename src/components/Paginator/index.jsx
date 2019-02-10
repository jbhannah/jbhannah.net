import React, { Fragment } from "react"
import Link from "../Link"

const Paginator = ({ base, page: currentPage, numPages }) => {
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
          {currentPage > 1 ? (
            <Fragment>
              <li>
                <Link href={base}>«</Link>
              </li>
              <li>
                <Link href={`${pageBase}/${currentPage - 1}`}>‹</Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>«</li>
              <li>‹</li>
            </Fragment>
          )}
          {Array.from({ length: numPages }).map((_, i) => {
            const page = i + 1
            return (
              <li key={`paginate-${i}`}>
                {currentPage === page ? (
                  page
                ) : (
                  <Link href={i === 0 ? base : `${pageBase}/${page}`}>
                    {page}
                  </Link>
                )}
              </li>
            )
          })}
          {currentPage < numPages ? (
            <Fragment>
              <li>
                <Link href={`${pageBase}/${currentPage + 1}`}>›</Link>
              </li>
              <li>
                <Link href={`${pageBase}/${numPages}`}>»</Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>›</li>
              <li>»</li>
            </Fragment>
          )}
        </ul>
      </footer>
    )
  )
}

export default Paginator
