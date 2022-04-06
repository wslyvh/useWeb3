import styles from './header.module.scss'
import { Link } from 'components/link'
import Icon from 'assets/images/icon.svg'

type Props = {
  className?: string
}

export function Header(props: Props) {
  let className = `${styles.header}`
  if (props.className) className += ` ${props.className}`

  return (
    <header className={className}>
      <div className={styles.main}>
        <Link href="/" className={styles.icon}>
          <Icon />
        </Link>

        <ul className={styles.navigation}>
          <li className={styles.primary}>
            <Link href="#">Explore</Link>
            <aside className={styles.foldout}>
              <ul className={styles.subnav}>
                <li>
                  <Link href="/guides">
                    <span>📖</span>
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/books">
                    <span>📚</span>
                    Books
                  </Link>
                </li>
                <li>
                  <Link href="/podcasts">
                    <span>🎙️</span>
                    Podcasts
                  </Link>
                </li>
                <li>
                  <Link href="/movies">
                    <span>🎬</span>
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/websites">
                    <span>🌐</span>
                    Websites
                  </Link>
                </li>
                <li>
                  <Link href="/tags">
                    <span>🏷️</span>
                    Tags
                  </Link>
                </li>
              </ul>
            </aside>
          </li>
          <li className={styles.primary}>
            <Link href="/learn">Learn</Link>
          </li>
          <li className={styles.primary}>
            <Link href="/build">Build</Link>
          </li>
        </ul>

        <ul className={styles.icons}>
          <li>
            <i className="bi bi-search" />
          </li>
          <li>
            <i className="bi bi-person-circle" />
          </li>
        </ul>
      </div>
    </header>
  )
}
