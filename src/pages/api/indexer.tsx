import { NextApiRequest, NextApiResponse } from 'next'
import { Index } from 'services/indexer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await Promise.all([Index('mainnet'), Index('polygon'), Index('optimism'), Index('arbitrum')])

    res.status(200).json({ data: 'Ok' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ data: 'Unable to save gas price..' })
  }
}
