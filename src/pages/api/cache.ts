import type { NextApiRequest, NextApiResponse } from 'next'

const map = new Map()

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    const key = `API:Cache.Test`
    if (map.has(key)) {
        console.log('Cache has key', key, map.get(key)[1])
    }
    else {
        console.log('NO Cache. Set Date.now()', key)
        map.set(key, [{}, Date.now()])
    }

    res.status(200).send('Ok')    
    return
}
