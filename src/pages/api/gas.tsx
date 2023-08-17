import { NextApiRequest, NextApiResponse } from 'next'
import { GasPriceService } from 'services/gas'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const service = new GasPriceService()
    await service.SaveCurrentGasprice()

    res.status(200).json({ data: 'Ok' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ data: 'Unable to save gas price..' })
  }
}
