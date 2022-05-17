import { ReactNode } from 'react'
import styles from './topnav.module.scss'
import { Alert } from 'components/alert'
import { Header } from './header'
import { Footer } from './footer'
import { Newsletter } from 'components/newsletter'
import { Panel } from 'components/panel'
import { TitleWithAction } from './title-action'

type Props = {
  title?: string
  action?: {
    href: string
    text: string
  }
  hideNewsletter?: boolean
  className?: string
  children: ReactNode
}

export function TopnavLayout(props: Props) {
  let className = `${styles.container} light` // theme switcher (light/dark)
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      {/* <Alert text="Notification bar (e.g. News, Gitcoin rounds, etc.)" type="warning" center allowClose /> */}

      <Header />

      <main className={styles.content}>
        <div className={styles.inner}>
          {props.title && <TitleWithAction title={props.title} action={props.action} />}

          {props.children}

          {!props.hideNewsletter && (
            <div className={styles.center}>
              <Newsletter className={styles.newsletter} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
