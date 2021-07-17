import React, { ReactNode } from 'react'
import styles from './main.module.scss'
import { Sitenav } from 'components/sitenav'

type Props = {
  title?: string
  children: ReactNode
}

export function Main(props: Props) {
  const title = props.title ?? 'Learn web3'

  return (
    <div className={styles.container}>
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
            Created by <a href="https://twitter.com/wslyvh" target="_blank" rel="noopener noreferrer">@wslyvh</a>
          </p>
        </footer>
      </main>
    </div>
  )
}
