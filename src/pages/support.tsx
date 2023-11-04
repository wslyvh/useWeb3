import React from 'react'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD, GITCOIN_GRANT, NEWSLETTER_URL } from 'utils/constants'
import styles from './pages.module.scss'
import { SEO } from 'components/SEO'
import { MarkdownContentService } from 'services/content'
import Link from 'next/link'
import { TopnavLayout } from 'components/layouts/topnav'
import { Pricing, PricingNewsletter } from 'components/form/pricing'
import { RECEIVER_ADDRESS, RECEIVER_ENS } from 'utils/jobs'

interface Props {
  categories: Array<Category>
}

export default function Support(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO title="Support us" />
      <TopnavLayout className={`${styles.container} markdown`} title="Support useWeb3" hideNewsletter>
        <section>
          <p>
            useWeb3 has a very diverse, globally distributed community of Web3-/crypto curious. A technical audience, including designers, researchers
            and other builders (e.g community builders, content creators, founders, etc..).
          </p>
          <p>There are a few ways to contribute, collaborate or connect.</p>
        </section>

        <section>
          <h3>Content</h3>
          <p>
            All the content on useWeb3 is <Link href="https://github.com/wslyvh/useWeb3/tree/main/content">open and available on GitHub</Link>. If you
            have any resources, videos, guides or other content that you want to promote, feel free to submit a PR.
          </p>
          <p>The requirements are that it should be ecudational, open, accessible (free) and aligned with the values of crypto and Web3.</p>
          <p>* No project/token/NFT shilling or promotions!</p>
        </section>
        {/* 
        <section>
          <h3>Jobs</h3>
          <p>
            The job board has been one of the most popular sections of the site since it launched. You can submit jobs posting at{' '}
            <Link href="https://www.useweb3.xyz/jobs/post">https://www.useweb3.xyz/jobs/post</Link>.
          </p>
          <p>
            <Pricing />
          </p>
        </section> */}

        <section>
          <h3>Newsletter</h3>
          <p>Newsletter sponsoring offers the most flexible option to promote any specific product, services or other announcements.</p>
          <p>
            In the monthly newsletter, I cover general project updates, news from the ecosystem, the latest jobs, resources, events and open-source
            issues to start contributing.
          </p>
          <p>
            You can view previous issues or subscribe <Link href={NEWSLETTER_URL}>here</Link>.
          </p>
          <p>
            <PricingNewsletter />
          </p>

          <h4>Stats</h4>
          <ul>
            <li>Active subscribers: 12.5k</li>
            <li>Open rate: 51%</li>
            <li>Frequency: monthly</li>
            <li>Slots: Only 1 premium slot per edition</li>
          </ul>

          <h4>Format</h4>
          <p>The newsletter has only 1, premium sponsorship slot per edition. This includes:</p>
          <ul>
            <li>Title: will be included in newsletter title</li>
            <li>Description: custom, tweet size (280 chars) copy, with basic markdown formatting (bold, italic, underline, lists. No images)</li>
            <li>Link: to website or CTA</li>
            <li>Twitter account: will be tagged whenever the newsletter goes out, thanking you for supporting our mission</li>
          </ul>
        </section>

        <section>
          <h3>Payments &amp; Donations</h3>
          <p>All payments can be be made using ETH/DAI/UDSC on Mainnet/Arbitrum/Optimism</p>
          <p>If you want to support our mission and help on-board more people into Web3 & Crypto, any donations are also much appreciated.</p>
          <ul>
            <li>
              Address: <Link href={`https://etherscan.io/address/${RECEIVER_ADDRESS}`}>{RECEIVER_ADDRESS}</Link>
            </li>
            <li>
              ENS: <Link href={`https://etherscan.io/enslookup-search?search=${RECEIVER_ENS}`}>{RECEIVER_ENS}</Link>
            </li>
            <li>
              <Link href={GITCOIN_GRANT}>Gitcoin Grants</Link>
            </li>
          </ul>
        </section>

        <section>
          <h3>Thank you!</h3>
          <p>
            Thank you so much for your consideration and support.
            <br />
            useWeb3 is a bootstrapped, indie-project by <Link href="https://twitter.com/wslyvh">@wslyvh</Link>. Your support helps to on-board more
            devs into the Web3/crypto ecosystem.
          </p>
          <p>🙏 Wesley</p>
        </section>
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  return {
    props: {
      categories,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
