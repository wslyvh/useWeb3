import { usePlausible } from 'next-plausible'
import React from 'react'
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
        <Link href="https://gitcoin.co/grants/4143/wslyvh-useweb3-ethgas-tokenlog-more">Gitcoin Grants</Link>.
        <br />
        Your donation helps to keep this site running. Thank you!
      </p>
    </section>
  )
}
