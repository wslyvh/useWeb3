import { useState } from 'react'
import styles from './gas-table.module.scss'

interface Props {
  gasPrice: number
  etherPrice: number
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
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`
  const [customGas, setCustomGas] = useState(0)

  function getUsdValue(priceInGwei: number) {
    return ((priceInGwei * props.gasPrice) / 1e9) * props.etherPrice
  }

  return (
    <article className={className}>
      <small className="muted">
        * At current gas price of <strong>{props.gasPrice} gwei</strong>.
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
          <tr>
            <td>Custom</td>
            <td className={styles.right}>
              <input
                className={styles.customInput}
                onChange={(e) => setCustomGas(Number(e.target.value))}
                autoComplete="off"
                placeholder="Gas cost in gwei"
              />
            </td>
            <td className={styles.right}>${getUsdValue(customGas).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}
