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
      {/* <Alert
        text="Test your Web3 knowledge and claim your ZK certifications @ the new useWeb3 Academy"
        url="https://academy.useweb3.xyz/"
        type="info"
        center
      /> */}

      {/* <Alert text="🌱 If you like useWeb3 - considering donating in the current Gitcoin Grants round." url={GITCOIN_GRANT} type="success" center /> */}

      <Alert
        text="✨ I'm participating in Optimimsm's RPGF Round 3. 
        Check out my submission to support my work"
        url={'https://vote.optimism.io/retropgf/3/application/0x7a1947b73ddb3943d864d089f552222edca3de46a42cbebf8d873f139aeef609'}
        type="success"
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
