import type { NextApiRequest, NextApiResponse } from 'next'
import { AirtableItemService } from 'services/airtable'
const Twit = require('twit')

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    const secret = req.query.secret as string
    if (!secret || secret !== process.env.APP_SECRET) {
      res.status(405).send("secret not provided.")
      return
    }

    const twitterClient = new Twit({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })

    const service = new AirtableItemService()
    const categories = await service.GetCategories()
    const items = await service.GetItems()
    const item = items[Math.floor(Math.random() * items.length)]
    const category = categories.find(i => i.id === item.category.id)
    
    const text = `${category?.emoji} ${item.title}
by ${item.authors.join(' ')}

Check it out at 👇
${item.url}`

    console.log(text)
    let error = ''
    try {
        twitterClient.post('statuses/update', { status: text }, function (err: any, data: any, response: any) {
            if (err) {
                error = err
                console.log('Unable to post Twitter update..')
                console.error(err)
            }
            else { 
                console.log('Update posted to Twitter..')
                console.log(`https://twitter.com/useWeb3/status/${data.id_str}`)
            }
        })
    }
    catch(e) {
        error = 'Unknown error'
        console.log('Unable to post Twitter update..')
        console.error(e)
    }

    if (error) res.status(500).send(error)
    else res.status(200).send('Ok')
    
    return
}
