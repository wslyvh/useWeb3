import type { NextApiRequest, NextApiResponse } from 'next'
import { AirtableService } from 'services/airtable'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const service = new AirtableService()
    const job = await service.GetJob(req.query.id as string)

    return job
      ? res.status(200).json({ status: 200, message: '', data: job })
      : res.status(500).json({ status: 200, message: 'Unable to get job' })
  }

  return res.status(400).send({ code: 400, message: 'Invalid method.' })
}
