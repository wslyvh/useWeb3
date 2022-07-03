import styles from './header.module.scss'
import { Link } from 'components/link'
import Icon from 'assets/images/icon.svg'
import { useRef, useState } from 'react'
import { Searchbar } from './searchbar'
import { useOnOutsideClick } from 'hooks/useOnOutsideClick'
import { MobileSubmenu } from './submenu'

type Props = {
  className?: string
}

export const MENU_ITEMS = [
  { url: `/books`, icon: '📚', text: 'Books', category: 'explore' },
  { url: `/guides`, icon: '📖', text: 'Guides', category: 'explore' },
  { url: `/podcasts`, icon: '🎙️', text: 'Podcasts', category: 'explore' },
  { url: `/movies`, icon: '🎬', text: 'Movies', category: 'explore' },
  { url: `/websites`, icon: '🌐', text: 'Websites', category: 'explore' },
  { url: `/tags`, icon: '🏷️', text: 'Tags', category: 'explore' },
  { url: `/code-challenges`, icon: '🏆', text: 'Challenges', category: 'learn' },
  { url: `/courses`, icon: '🎓', text: 'Courses', category: 'learn' },
  { url: `/tutorials`, icon: '💻', text: 'Tutorials', category: 'learn' },
  { url: `/videos`, icon: '📺', text: 'Videos', category: 'learn' },
  { url: `/contribute`, icon: '✨', text: 'Contribute', category: 'build' },
  { url: `/earn`, icon: '💸', text: 'Earn', category: 'build' },
  { url: `/grants`, icon: '💰', text: 'Grants', category: 'build' },
  { url: `/starter-kits`, icon: '🏗️', text: 'Templates', category: 'build' },
  { url: `/jobs`, icon: '💼', text: 'Jobs', category: 'build' },
]

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
            <span>Explore</span>
            <aside className={styles.foldout}>
              <ul className={styles.subnav}>
                {MENU_ITEMS.filter((i) => i.category === 'explore').map((i) => {
                  return (
                    <li key={i.url}>
                      <Link href={i.url}>
                        <span>{i.icon}</span>
                        {i.text}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </aside>
          </li>
          <li className={styles.primary}>
            <span>Learn</span>
            <aside className={styles.foldout}>
              <ul className={styles.subnav}>
                {MENU_ITEMS.filter((i) => i.category === 'learn').map((i) => {
                  return (
                    <li key={i.url}>
                      <Link href={i.url}>
                        <span>{i.icon}</span>
                        {i.text}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </aside>
          </li>
          <li className={styles.primary}>
            <span>Build</span>
            <aside className={styles.foldout}>
              <ul className={styles.subnav}>
                {MENU_ITEMS.filter((i) => i.category === 'build').map((i) => {
                  return (
                    <li key={i.url}>
                      <Link href={i.url}>
                        <span>{i.icon}</span>
                        {i.text}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </aside>
          </li>
        </ul>

        <ul className={styles.icons}>
          <li className={styles.emoji}>
            <Link href="/gas">⛽</Link>
          </li>
          <li onClick={() => setFoldout(foldout !== 'search' ? 'search' : '')}>
            <i className="bi bi-search" />
          </li>
          <li className={styles.hamburger} onClick={() => setFoldout(foldout !== 'submenu' ? 'submenu' : '')}>
            <i className="bi bi-list" />
          </li>
          {/* <li className={styles.primary} onClick={() => setFoldout(foldout !== 'account' ? 'account' : '')}>
            <i className="bi bi-person-circle" />
          </li> */}
        </ul>
      </div>

      <MobileSubmenu
        className={`${styles.submenu} ${foldout === 'submenu' ? styles.open : ''}`}
        open={foldout === 'submenu'}
        close={() => onClose()}
      />

      <Searchbar className={`${styles.foldout} ${foldout === 'search' ? styles.open : ''}`} open={foldout === 'search'} close={() => onClose()} />
    </header>
  )
}
