import { usePlausible } from 'next-plausible'
import React from 'react'
import styles from './newsletter.module.scss'

interface Props {
  className?: string
}

export function Newsletter(props: Props) {
  const plausible = usePlausible()
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <section className={className}>
      <h3>Newsletter</h3>
      <p className={styles.description}>
        The useWeb3 newsletter is coming soon. Sign up to be the first to get it and stay up to date with the latest
        news, resources and updates.
      </p>

      <form
        onSubmit={() => plausible('Subscribe')}
        action="https://vanheije.us12.list-manage.com/subscribe/post?u=ad3d60f21465218a2b99d8b40&amp;id=55e8df606c"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate>
        <div id="mc_embed_signup_scroll">
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input type="text" name="b_ad3d60f21465218a2b99d8b40_55e8df606c" tabIndex={-1} value="" readOnly />
          </div>
          <div>
            <input
              type="checkbox"
              value="2"
              name="group[51481][2]"
              id="mce-group[51481]-51481-1"
              hidden
              checked
              readOnly
            />
          </div>

          <div className={styles.row}>
            <div className="fixed wrapper block">
              <input type="email" name="EMAIL" id="mce-EMAIL" placeholder="email address" required />
            </div>
            <button type="submit" name="subscribe" id="mc-embedded-subscribe" className="accent block searchButton">
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
