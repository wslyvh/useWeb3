import styles from './footer.module.scss'
import { Link } from 'components/link'
import Image from 'next/image'
import { DEPARTMENTS } from 'utils/jobs'
import { defaultSlugify } from 'utils/helpers'
import { MENU_ITEMS } from './header'

type Props = {
  className?: string
}

export function Footer(props: Props) {
  let className = `${styles.footer}`
  if (props.className) className += ` ${props.className}`

  return (
    <footer className={className}>
      <div className={styles.inner}>
        <div className={styles.navigation}>
          <ul>
            <li className={styles.header}>Explore</li>
            {MENU_ITEMS.filter((i) => i.category === 'explore').map((i) => {
              return (
                <li key={i.url}>
                  <Link href={i.url}>{i.text}</Link>
                </li>
              )
            })}
          </ul>
          <ul>
            <li className={styles.header}>Learn</li>
            {MENU_ITEMS.filter((i) => i.category === 'learn').map((i) => {
              return (
                <li key={i.url}>
                  <Link href={i.url}>{i.text}</Link>
                </li>
              )
            })}
          </ul>
          <ul>
            <li className={styles.header}>Build</li>
            {MENU_ITEMS.filter((i) => i.category === 'build').map((i) => {
              return (
                <li key={i.url}>
                  <Link href={i.url}>{i.text}</Link>
                </li>
              )
            })}
          </ul>
          <ul>
            <li className={styles.header}>Jobs</li>
            {DEPARTMENTS.map((i) => {
              const id = defaultSlugify(i)
              return (
                <li key={i}>
                  <Link href={`/jobs/t/${id}`}>{i}</Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.links}>
          <p>
            <Link href="/support">
              <strong>Support Us</strong>
            </Link>
          </p>
          <p>
            <Link href="https://github.com/wslyvh/useWeb3/tree/main/content">
              Submit Resources <i className="bi bi-arrow-up-right" />
            </Link>
          </p>
        </div>

        <hr />

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

          <Link href="https://vercel.com/?utm_source=useWeb3&amp;utm_campaign=oss">
            <Image src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by Vercel" height={32} width={120} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
