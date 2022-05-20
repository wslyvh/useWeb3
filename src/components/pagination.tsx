import { useRouter } from 'next/router'
import React from 'react'
import { Link } from './link'
import styles from './pagination.module.scss'

type Props = {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  truncate?: boolean
  className?: string
}

export const Pagination = (props: Props) => {
  let className = styles.container
  if (props.className) className += ` ${props.className}`

  const router = useRouter()
  const paths = router.asPath.split('/')
  const lastPathIsPageNr = paths[paths.length - 1].match(/^\d+$/)
  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage)
  const baseUri = lastPathIsPageNr ? paths.slice(0, paths.length - 1).join('/') : router.asPath

  function pagesToShow() {
    const offset = 2
    const left = props.currentPage - offset
    const right = props.currentPage + offset + 1
    const pages = []
    const truncatedPages = []

    if (!props.truncate) {
      return Array.from(Array(totalPages + 1).keys()).splice(1)
    }

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        pages.push(i)
      }
    }

    let l
    for (let i of pages) {
      if (l) {
        if (i - l === 2) {
          truncatedPages.push(l + 1)
        } else if (i - l !== 1) {
          truncatedPages.push('...')
        }
      }

      truncatedPages.push(i)
      l = i
    }

    return truncatedPages
  }

  return (
    <ul className={className}>
      <li>
        {props.currentPage === 1 && <i className={`${styles.disabled} bi bi-chevron-left`} />}
        {props.currentPage > 1 && (
          <Link href={`${baseUri}/${props.currentPage === 1 ? 1 : props.currentPage - 1}`}>
            <i className="bi bi-chevron-left" />
          </Link>
        )}
      </li>

      {pagesToShow().map((i, index) => {
        return (
          <li key={`pagination_${className}_${index}`}>
            {typeof i === 'string' && <i className={styles.disabled}>...</i>}
            {typeof i === 'number' && (
              <Link href={`${baseUri}/${i}`} className={props.currentPage === i ? styles.selected : ''}>
                {i}
              </Link>
            )}
          </li>
        )
      })}

      <li>
        {props.currentPage === totalPages && <i className={`${styles.disabled} bi bi-chevron-right`} />}
        {props.currentPage < totalPages && (
          <Link href={`${baseUri}/${props.currentPage === totalPages ? totalPages : props.currentPage + 1}`}>
            <i className="bi bi-chevron-right" />
          </Link>
        )}
      </li>
    </ul>
  )
}
