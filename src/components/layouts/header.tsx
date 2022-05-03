import styles from './header.module.scss'
import { Link } from 'components/link'
import Icon from 'assets/images/icon.svg'
import { useRef, useState } from 'react'
import { Searchbar } from './searchbar'
import { useOnOutsideClick } from 'hooks/useOnOutsideClick'

type Props = {
  className?: string
}

export const explore = [
  { url: `/books`, icon: '📚', text: 'Books' },
  { url: `/gas`, icon: '⛽', text: 'Gas' },
  { url: `/guides`, icon: '📖', text: 'Guides' },
  { url: `/podcasts`, icon: '🎙️', text: 'Podcasts' },
  { url: `/movies`, icon: '🎬', text: 'Movies' },
  { url: `/websites`, icon: '🌐', text: 'Websites' },
  { url: `/tags`, icon: '🏷️', text: 'Tags' },
]

export const learn = [
  { url: `/code-challenges`, icon: '🏆', text: 'Challenges' },
  { url: `/courses`, icon: '🎓', text: 'Courses' },
  { url: `/tutorials`, icon: '💻', text: 'Tutorials' },
  { url: `/videos`, icon: '📺', text: 'Videos' },
]
// 1 single page to filter/search for resources
// + link to submit resources

export const build = [
  { url: `/starter-kits`, icon: '🏗️', text: 'Templates' },
  { url: `/earn`, icon: '💸', text: 'Earn' },
  { url: `/jobs`, icon: '💼', text: 'Jobs' },
  { url: `/grants`, icon: '💰', text: 'Grants' },
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
                {explore.map((i) => {
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
            <Link href="/learn">Learn</Link>
            <aside className={styles.foldout}>
              <ul className={styles.subnav}>
                {learn.map((i) => {
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
                {build.map((i) => {
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
