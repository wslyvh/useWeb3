import { ReactNode } from 'react'
import styles from './topnav.module.scss'
import { Alert } from 'components/alert'
import { Header } from './header'
import { Footer } from './footer'

type Props = {
  className?: string
  children: ReactNode
}

export function TopnavLayout(props: Props) {
  let className = `${styles.container} light` // theme switcher (light/dark)
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <Alert text="Notification bar (e.g. News, Gitcoin rounds, etc.)" type="warning" center allowClose />

      <Header />

      <main className={styles.content}>{props.children}</main>

      <Footer />
    </div>
  )
}
