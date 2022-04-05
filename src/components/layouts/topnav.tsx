import { ReactNode } from 'react'
import styles from './topnav.module.scss'
import { Link } from 'components/link'
import Image from 'next/image'
import { Alert } from 'components/alert'
import Icon from 'assets/images/icon.svg'

type Props = {
  className?: string
  children: ReactNode
}

export function TopnavLayout(props: Props) {
  let className = `${styles.container} light` // theme switcher (light/dark)
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <Alert text='Optional Notification bar (e.g. News, Gitcoin rounds, etc.)' type='warning' center allowClose />

      <header className={styles.header}>
        <div className={styles.main}>
          <Link href='/' className={styles.icon}>
            <Icon />
          </Link>

          <ul className={styles.navigation}>
            <li className={styles.primary}>
              <Link href='#'>Explore</Link>
              <aside className={styles.foldout}>
                <ul className={styles.subnav}>
                  <li>
                    <Link href='/guides'>
                      <span>📖</span>
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href='/books'>
                      <span>📚</span>
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link href='/podcasts'>
                      <span>🎙️</span>
                      Podcasts
                    </Link>
                  </li>
                  <li>
                    <Link href='/movies'>
                      <span>🎬</span>
                      Movies
                    </Link>
                  </li>
                  <li>
                    <Link href='/websites'>
                      <span>🌐</span>
                      Websites
                    </Link>
                  </li>
                  <li>
                    <Link href='/tags'>
                      <span>🏷️</span>
                      Tags
                    </Link>
                  </li>
                </ul>
              </aside>
            </li>
            <li className={styles.primary}><Link href='/learn'>Learn</Link></li>
            <li className={styles.primary}><Link href='/build'>Build</Link></li>
          </ul>

          <ul className={styles.icons}>
            <li><i className="bi bi-search" /></li>
            <li><i className="bi bi-person-circle" /></li>
          </ul>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.inner}>
          {props.children}

          <footer className={styles.footer}>
            <p>
              By <Link href="https://twitter.com/wslyvh">@wslyvh</Link> · Follow{' '}
              <Link href="https://twitter.com/useWeb3">useWeb3</Link> · Contribute{' '}
              <Link href="https://github.com/wslyvh/useWeb3">Github</Link>.
            </p>
            <p>
              <Link href="https://vercel.com/?utm_source=useWeb3&amp;utm_campaign=oss">
                <Image
                  src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
                  alt="Powered by Vercel"
                  height={28}
                  width={200}
                />
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
