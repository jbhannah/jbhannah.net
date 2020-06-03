import React, { Fragment } from "react"
import Link from "../Link"

const paginatorCSS = {
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
}

const backLinks = (base, pageBase, currentPage) =>
  currentPage > 1 ? (
    <Fragment>
      <li>
        <Link href={base}>«</Link>
      </li>
      <li>
        <Link href={currentPage == 2 ? base : `${pageBase}/${currentPage - 1}`}>
          ‹
        </Link>
      </li>
    </Fragment>
  ) : (
    <Fragment>
      <li>«</li>
      <li>‹</li>
    </Fragment>
  )

const forwardLinks = (pageBase, currentPage, numPages) =>
  currentPage < numPages ? (
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
  )

const pageLink = (base, pageBase, currentPage) => (_, i) => {
  const page = i + 1
  return (
    <li key={`paginate-${i}`}>
      {currentPage === page ? (
        page
      ) : (
        <Link href={i === 0 ? base : `${pageBase}/${page}`}>{page}</Link>
      )}
    </li>
  )
}

const Paginator = ({ base, page: currentPage, numPages }) => {
  const pageBase = base === "/" ? "/page" : `${base}/page`

  return (
    numPages > 1 && (
      <footer>
        <ul css={paginatorCSS}>
          {backLinks(base, pageBase, currentPage)}
          {Array.from({ length: numPages }).map(
            pageLink(base, pageBase, currentPage)
          )}
          {forwardLinks(pageBase, currentPage, numPages)}
        </ul>
      </footer>
    )
  )
}

export default Paginator
