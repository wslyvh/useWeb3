import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from '../pages.module.scss'
import { SEO } from 'components/SEO'
import { MarkdownContentService } from 'services/content'
import { Heatmap } from 'components/charts/heatmap'
import { GasData as GasDataType, GasFee } from 'types/gas'
import Link from 'next/link'
import { GasTable } from 'components/gas-table'
import { TopnavLayout } from 'components/layouts/topnav'
import { Panel } from 'components/panel'
import { useEtherPrice } from 'hooks/useEtherPrice'
import { useGasPrice } from 'hooks/useGasPrice'
import { GasNotifications } from 'components/gas-notifications'
import { GetAverage, GetGasData } from 'services/indexer'
import { Featured } from 'components/featured'
import { TrendChart } from 'components/charts/trend'
import { capitalize } from 'utils/helpers'

interface Props {
  categories: Array<Category>
  network: string
  heatmap: GasFee[]
  gasData: GasDataType
}

interface Params extends ParsedUrlQuery {
  network: string
}

export default function Index(props: Props) {
  const { gasPrice, priorityFee } = useGasPrice(props.network)
  const etherPrice = useEtherPrice()
  const networkName = capitalize(props.network)
  const defaultTitle = `${networkName} Gas tracker`
  const title = gasPrice > 0 ? `${gasPrice} Gwei` : defaultTitle

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={title} divider="⛽" description={`Monitor and track the ${networkName} gas price to reduce transaction fees save money.`} />
      <TopnavLayout className={styles.container} title={defaultTitle} action={{ href: 'https://www.ethgastracker.com/docs', text: 'Get API Access' }}>
        <section>
          <Featured className={styles.featured} double>
            <Panel type="primary" fill stretch>
              <div style={{ padding: '8px' }}>
                <h4>⛽ Current</h4>
                <br />
                <span>{gasPrice > 0 ? gasPrice : '-'} Max fee</span>
                <br />
                <span>{priorityFee > 0 ? priorityFee : '-'} priority</span>
              </div>
            </Panel>
            <Panel type="neutral" stretch>
              <div style={{ padding: '8px' }}>
                <h4>🕘 Avg/last hour</h4>
                <br />
                <span>baseFee: {props.gasData.lastHour}</span>
              </div>
            </Panel>
          </Featured>
        </section>

        <article>
          <p>
            Gas is a fundamental element for any public blockchain network such as {networkName}. Understanding how it works is key to efficiently use
            and develop on {networkName} and can greatly reduce the gas fees, required to deploy and transact with the network.
          </p>
        </article>

        <section>
          <h2>Median Gas prices</h2>
          <TrendChart data={props.gasData.fees} network={props.network as any} />
        </section>

        <section>
          <h2>Weekly Heatmap</h2>
          <Heatmap data={props.heatmap} network={props.network as any} />
        </section>

        <GasNotifications />

        <article className="markdown">
          <h2>Average {networkName} Transaction costs</h2>
          <GasTable gasPrice={gasPrice} etherPrice={etherPrice} />
        </article>

        <article className={`${styles.gas} markdown`}>
          <h3>Other Networks</h3>
          <ul>
            <li>
              <Link href="/gas">Ethereum Gas Tracker</Link>
            </li>
            <li>
              <Link href="/gas/arbitrum">Arbitrum Gas Tracker</Link>
            </li>
            <li>
              <Link href="/gas/optimism">Optimism Gas Tracker</Link>
            </li>
            <li>
              <Link href="/gas/base">Base Gas Tracker</Link>
            </li>
          </ul>
        </article>

        <article className="markdown">
          <h3>{networkName} Gas explained</h3>
          <p>
            Gas is an important concept within the Web3 world. It is the virtual fuel required to execute transactions on the network. Similar to how
            a car needs gasoline to drive. Most public blockchains denominate these transaction fees in their native currency.
          </p>
          <p>There are a few crucial aspects of using gas or transaction fees in public, permissionless networks:</p>
          <ol>
            <li>
              Every transaction published on a blockchain imposes a cost of downloading, executing and verify it. People who run a node (validators)
              spend time, money and effort to do this for which they are compensated. Transaction fees are rewarded to them for providing these
              services.
            </li>
            <li>
              A fee market allows prioritization of transactions by &apos;tipping&apos; the validators for processing specific transactions more
              quickly.
            </li>
            <li>
              For smart contract platforms, it avoids computational waste in code, by setting a limit to how many steps of code executions it can
              perform within a transaction.
            </li>
            <li>
              Additionally, it prevents accidental or hostile infinite loops, e.g. denial of service (&apos;DDoS&apos;) attacks. In a DDoS attack, an
              attacker tries to flood the network by spamming empty transactions. A fee market ensures that doing such attacks, for an extended period
              of time, to become expensive.
            </li>
          </ol>
        </article>

        <article className={`${styles.gas} markdown`}>
          <h3>Further reading</h3>
          <ul>
            <li>
              <Link href="https://ethereum.org/en/developers/docs/gas/">https://ethereum.org/en/developers/docs/gas/</Link>
            </li>
            <li>
              <Link href="https://www.blocknative.com/gas-platform">https://www.blocknative.com/gas-platform</Link>
            </li>
          </ul>
        </article>
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { network: 'arbitrum' },
      },
      {
        params: { network: 'base' },
      },
      {
        params: { network: 'optimism' },
      },
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const network = context.params?.network ?? ''
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  if (!network || !['arbitrum', 'base', 'mainnet', 'optimism'].includes(network)) {
    return {
      props: null,
      notFound: true,
      revalidate: DEFAULT_REVALIDATE_PERIOD,
    }
  }

  const gasData = await GetGasData(network as any)
  const hourlyAverages = await GetAverage('hour', 168, network as any)

  return {
    props: {
      categories,
      network,
      gasData,
      heatmap: hourlyAverages ?? [],
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
