import type { NextApiRequest, NextApiResponse } from 'next'
import { AirtableService } from 'services/airtable'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return POST(req, res)
  }

  return res.status(400).send({ code: 400, message: 'Invalid method.' })
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const service = new AirtableService()
  const id = await service.CreateJob(req.body.job)

  return id
    ? res.status(200).json({ status: 200, message: 'OK', data: id })
    : res.status(500).json({ status: 200, message: 'Unable to save job' })
}
