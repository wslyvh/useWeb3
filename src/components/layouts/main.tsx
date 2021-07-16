import React, { ReactNode } from 'react'
import styles from './main.module.scss'
import { Sitenav } from 'components/sitenav'

type Props = {
  children: ReactNode
}

export function Main(props: Props) {
  return (
    <div className={styles.container}>
      <aside className={styles.sitenav}>
        <Sitenav />
      </aside>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1>Learn web3</h1>
        </header>

        <main>{props.children}</main>
        
        <footer>
          <p>
            Created by <a href="https://twitter.com/wslyvh" target="_blank" rel="noopener noreferrer">@wslyvh</a>
          </p>
        </footer>
      </div>
    </div>
  )
}
