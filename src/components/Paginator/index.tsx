import styled from "@emotion/styled"
import * as React from "react"
import { Link } from "../Link"

const UL = styled.ul({
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
})

const backLinks = (base: string, pageBase: string, currentPage: number) =>
  currentPage > 1 ? (
    <>
      <li>
        <Link href={base}>«</Link>
      </li>
      <li>
        <Link href={currentPage == 2 ? base : `${pageBase}/${currentPage - 1}`}>
          ‹
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>«</li>
      <li>‹</li>
    </>
  )

const forwardLinks = (
  pageBase: string,
  currentPage: number,
  numPages: number
) =>
  currentPage < numPages ? (
    <>
      <li>
        <Link href={`${pageBase}/${currentPage + 1}`}>›</Link>
      </li>
      <li>
        <Link href={`${pageBase}/${numPages}`}>»</Link>
      </li>
    </>
  ) : (
    <>
      <li>›</li>
      <li>»</li>
    </>
  )

const pageLink =
  (base: string, pageBase: string, currentPage: number) =>
  (_: any, i: number) => {
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

interface PaginatorProps {
  base: string
  page: number
  numPages: number
}

export const Paginator: React.FunctionComponent<PaginatorProps> = ({
  base,
  page: currentPage,
  numPages,
  ...props
}) => {
  if (numPages === 1) return <></>

  const pageBase = base === "/" ? "/page" : `${base}/page`
  const back = backLinks(base, pageBase, currentPage)
  const forward = forwardLinks(pageBase, currentPage, numPages)

  return (
    <footer {...props}>
      <UL>
        {back}
        {Array.from({ length: numPages }).map(
          pageLink(base, pageBase, currentPage)
        )}
        {forward}
      </UL>
    </footer>
  )
}
