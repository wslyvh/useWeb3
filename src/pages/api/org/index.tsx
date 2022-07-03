import type { NextApiRequest, NextApiResponse } from 'next'
import { AirtableService } from 'services/airtable'
import { GetOrganizations } from 'services/jobs'
import { Organization } from 'types/org'

const cache = new Map()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return GET(req, res)
  }
  if (req.method === 'POST') {
    return POST(req, res)
  }

  return res.status(400).send({ code: 400, message: 'Invalid method.' })
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  let orgs: Array<Organization> = []
  const cacheKey = 'api/organization:all'
  if (cache.has(cacheKey)) {
    orgs = cache.get(cacheKey)
  } else {
    orgs = await GetOrganizations()
  }

  return res.status(200).json({ status: 200, message: '', data: orgs })
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const service = new AirtableService()
  const id = await service.CreateOrg(req.body.org)

  return id ? res.status(200).json({ status: 200, message: 'OK', data: id }) : res.status(500).json({ status: 200, message: 'Unable to save org' })
}
