import React, { ReactNode } from 'react'
import styles from './main.module.scss'
import { Sitenav } from 'components/sitenav'
import { Link } from 'components/link'
import { Newsletter } from 'components/newsletter'

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
        
        <Newsletter className={styles.newsletter} />

        <footer className={styles.footer}>
          <p>
            Follow on Twitter <Link href="https://twitter.com/useWeb3">@useWeb3</Link>. Contribute <Link href="https://github.com/wslyvh/useWeb3">Github</Link>.
          </p>
          <p>
            Created by <Link href="https://twitter.com/wslyvh">@wslyvh</Link>.
          </p>
        </footer>
      </main>
    </div>
  )
}
