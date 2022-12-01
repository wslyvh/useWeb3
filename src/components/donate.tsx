import React from 'react'
import { GITCOIN_GRANT } from 'utils/constants'
import styles from './donate.module.scss'
import { Link } from './link'

interface Props {
  className?: string
}

export function Donate(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <section className={className}>
      <h3>💰 Support us 💰</h3>
      <p className={styles.description}>
        Enjoy useWeb3? Please consider donating on{' '}
        <Link href={GITCOIN_GRANT}>Gitcoin Grants</Link>.
        <br />
        Your donation helps to keep this site running. Thank you!
      </p>
    </section>
  )
}
