import { useEtherPrice } from 'hooks/useEtherPrice'
import { useGasPrice } from 'hooks/useGasPrice'
import styles from './gas-table.module.scss'

interface Props {
  className?: string
}

const transactions = [
  { name: 'ETH Transfer', cost: 21000 },
  { name: 'ERC20 Approval', cost: 45000 },
  { name: 'ERC20 Token Transfer', cost: 65000 },
  { name: 'ERC721 NFT Transfer', cost: 85000 },
  { name: 'Uniswap V2 Swap', cost: 150000 },
  { name: 'Uniswap V3 Swap', cost: 185000 },
  { name: 'OpenSea Sale', cost: 205000 },
  { name: 'Uniswap V3 Liquidity', cost: 215000 },
  { name: 'L2 Deposits (Arbitrum, zkSync, Polygon,..)', cost: 250000 },
  { name: 'ENS Registration', cost: 265000 },
]

export function GasTable(props: Props) {
  const gasPrice = useGasPrice(60000)
  const etherPrice = useEtherPrice(60000)
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  function getUsdValue(priceInGwei: number) {
    return ((priceInGwei * gasPrice) / 1e9) * etherPrice
  }

  return (
    <article className={className}>
      <small className="muted">
        * At current gas price of <strong>{gasPrice} gwei</strong>.
      </small>
      <table>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Gwei</th>
            <th>$ USD</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((i) => {
            return (
              <tr key={i.name}>
                <td>{i.name}</td>
                <td className={styles.right}>{i.cost.toLocaleString('en-US')}</td>
                <td className={styles.right}>${getUsdValue(i.cost).toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </article>
  )
}
