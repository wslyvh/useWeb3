import type { NextApiRequest, NextApiResponse } from 'next'
import { AirtableService } from 'services/airtable'
import { Company } from 'types/company'

const cache = new Map()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return GET(req, res)
    }
    if (req.method === 'POST') {
        return POST(req, res)
    }

    return res.status(400).send({ code: 400, message: 'Invalid method.' })
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
    let companies: Array<Company> = []
    const cacheKey = 'api/company:all'
    if (cache.has(cacheKey)) {
        companies = cache.get(cacheKey)
    }
    else {
        const service = new AirtableService()
        companies = await service.GetCompanies()
    }

    return res.status(200).json({ status: 200, message: '', data: companies })
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
    const service = new AirtableService()
    const id = await service.CreateCompany(req.body.company)

    return id ? res.status(200).json({ status: 200, message: 'OK', data: id }) :
        res.status(500).json({ status: 200, message: 'Unable to save company' })
}

