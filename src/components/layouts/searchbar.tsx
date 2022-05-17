import styles from './searchbar.module.scss'
import { Link } from 'components/link'
import { createRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Props = {
  open?: boolean
  close?: () => void
  className?: string
}

export function Searchbar(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  const router = useRouter()
  const ref = createRef<any>()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (ref.current && props.open) {
      setTimeout(() => {
        ref.current.focus()
      }, 100)
    }
  }, [ref, props.open])

  return (
    <div className={className}>
      <div className={styles.inner}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (searchTerm) {
              router.push(`/search?q=${searchTerm}`)
              setSearchTerm('')

              if (props.close) props.close()
            }
          }}>
          <div className={styles.searchbar}>
            <i className={`${styles.icon} bi bi-search`} onClick={() => ref.current?.focus()} />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              autoComplete="off"
              placeholder="Search.."
              ref={ref}
            />
            <i
              className={`${styles.clear} bi bi-x-circle-fill`}
              onClick={() => {
                setSearchTerm('')
                ref.current?.focus()
              }}
            />
          </div>
        </form>

        <ul className={styles.popular}>
          <li className={styles.header}>Popular search terms</li>
          <li onClick={() => (props.close ? props.close() : {})}>
            <Link href="/search?q=Solidity">Solidity</Link>
          </li>
          <li onClick={() => (props.close ? props.close() : {})}>
            <Link href="/search?q=NFT">NFTs</Link>
          </li>
          <li onClick={() => (props.close ? props.close() : {})}>
            <Link href="/search?q=DeFi">DeFi</Link>
          </li>
          <li onClick={() => (props.close ? props.close() : {})}>
            <Link href="/search?q=Web3">Web3</Link>
          </li>
          <li onClick={() => (props.close ? props.close() : {})}>
            <Link href="/search?q=Security">Security</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
