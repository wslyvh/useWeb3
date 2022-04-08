import styles from './header.module.scss'
import { Link } from 'components/link'
import Icon from 'assets/images/icon.svg'
import { useRef, useState } from 'react'
import { Searchbar } from './searchbar'
import { useOnOutsideClick } from 'hooks/useOnOutsideClick'

type Props = {
  className?: string
}

export function Header(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  const ref = useRef(null)
  const [foldout, setFoldout] = useState('')
  useOnOutsideClick(ref, () => setFoldout(''))

  function onClose() {
    setFoldout('')
  }

  return (
    <header className={className} ref={ref}>
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
          <li className={styles.primary} onClick={() => setFoldout(foldout !== 'search' ? 'search' : '')}>
            <i className="bi bi-search" />
          </li>
          <li className={styles.primary} onClick={() => setFoldout(foldout !== 'account' ? 'account' : '')}>
            <i className="bi bi-person-circle" />
          </li>
        </ul>
      </div>

      <Searchbar
        className={`${styles.foldout} ${foldout === 'search' ? styles.open : ''}`}
        open={foldout === 'search'}
        close={() => onClose()}
      />
    </header>
  )
}
