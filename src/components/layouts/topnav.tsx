import { ReactNode } from 'react'
import styles from './topnav.module.scss'
import { Alert } from 'components/alert'
import { Header } from './header'
import { Footer } from './footer'
import { Newsletter } from 'components/newsletter'
import { TitleWithAction } from './title-action'
import { GITCOIN_GRANT } from 'utils/constants'

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
      <Alert
        text="Paperweight scans your inbox to map your digital footprint, then helps you take back control and delete your data."
        url="https://www.paperweight.email/"
        type="info"
        center
      />

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
