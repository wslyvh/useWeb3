import styles from './submenu.module.scss'
import { useRouter } from 'next/router'
import { MENU_ITEMS } from './header'
import { useState } from 'react'
import { Link } from 'components/link'

type Props = {
  open?: boolean
  close?: () => void
  className?: string
}

export function MobileSubmenu(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  const router = useRouter()
  const activePage = router.query.category as string
  const activeCategory = MENU_ITEMS.find((i) => i.url === `/${activePage}`)?.category ?? ''
  const [collapsed, setCollapsed] = useState(activeCategory)

  return (
    <div className={className}>
      <div className={styles.inner}>
        <div className={styles.navigation}>
          <ul>
            <li className={styles.header} onClick={() => setCollapsed(collapsed !== 'explore' ? 'explore' : '')}>
              <span>Explore</span>
              {collapsed === 'explore' && <i className="bi bi-caret-up-fill" />}
              {collapsed !== 'explore' && <i className="bi bi-caret-down-fill" />}
            </li>
            {collapsed === 'explore' &&
              MENU_ITEMS.filter((i) => i.category === 'explore').map((i) => {
                return (
                  <ul key={i.url}>
                    <li key={i.url}>
                      <Link href={i.url} className={styles.item}>
                        <span>{i.icon}</span>
                        {i.text}
                      </Link>
                    </li>
                  </ul>
                )
              })}
            <li className={styles.header} onClick={() => setCollapsed(collapsed !== 'learn' ? 'learn' : '')}>
              <span>Learn</span>
              {collapsed === 'learn' && <i className="bi bi-caret-up-fill" />}
              {collapsed !== 'learn' && <i className="bi bi-caret-down-fill" />}
            </li>
            {collapsed === 'learn' &&
              MENU_ITEMS.filter((i) => i.category === 'learn').map((i) => {
                return (
                  <ul key={i.url}>
                    <li key={i.url}>
                      <Link href={i.url} className={styles.item}>
                        <span>{i.icon}</span>
                        {i.text}
                      </Link>
                    </li>
                  </ul>
                )
              })}
            <li className={styles.header} onClick={() => setCollapsed(collapsed !== 'build' ? 'build' : '')}>
              <span>Build</span>
              {collapsed !== 'build' && <i className="bi bi-caret-down-fill" />}
              {collapsed === 'build' && <i className="bi bi-caret-up-fill" />}
            </li>
            {collapsed === 'build' &&
              MENU_ITEMS.filter((i) => i.category === 'build').map((i) => {
                return (
                  <ul key={i.url}>
                    <li key={i.url}>
                      <Link href={i.url} className={styles.item}>
                        <span>{i.icon}</span>
                        {i.text}
                      </Link>
                    </li>
                  </ul>
                )
              })}
            <li className={styles.header}>
              <Link href="/support" className={styles.item}>
                <span>Support us</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.credits}>
          <ul>
            <li className={styles.icon}>
              <Link href="https://github.com/wslyvh/useWeb3">
                <i className="bi bi-github" />
              </Link>
            </li>
            <li className={styles.icon}>
              <Link href="https://twitter.com/useWeb3">
                <i className="bi bi-twitter" />
              </Link>
            </li>
            <li>
              by <Link href="https://twitter.com/wslyvh">@wslyvh</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
