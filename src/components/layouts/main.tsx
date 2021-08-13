import React, { ReactNode } from 'react'
import styles from './main.module.scss'
import { Sitenav } from 'components/sitenav'
import { Link } from 'components/link'

type Props = {
  title?: string
  className?: string
  children: ReactNode
}

export function Main(props: Props) {
  const title = props.title ?? 'useWeb3'

  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <aside className={styles.sitenav}>
        <Sitenav />
      </aside>
      <main className={styles.content}>
        <header className={styles.header}>
          <h1>{title}</h1>
        </header>

        {props.children}
        
        <footer>
          <p>
            Created by <Link href="https://twitter.com/wslyvh">@wslyvh</Link>
          </p>
        </footer>
      </main>
    </div>
  )
}
