import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { NETWORKS } from 'services/indexer'

export function GetRpcProvider(network: NETWORKS = 'mainnet') {
  if (!process.env.NEXT_PUBLIC_INFURA_API_KEY) {
    throw new Error('NEXT_PUBLIC_INFURA_API_KEY env variable is not set.')
  }
  if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
    throw new Error('NEXT_PUBLIC_ALCHEMY_API_KEY env variable is not set.')
  }

  if (network === 'arbitrum') {
    return new StaticJsonRpcProvider(`https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
  }
  if (network === 'optimism') {
    return new StaticJsonRpcProvider(`https://optimism.publicnode.com`)
    // return new StaticJsonRpcProvider(`https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`)
  }
  if (network === 'polygon') {
    return new StaticJsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`)
  }

  return new StaticJsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`)
}
