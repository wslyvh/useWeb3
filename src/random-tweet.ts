import * as dotenv from 'dotenv'
import { MarkdownContentService } from './services/content'
dotenv.config()
const Twit = require('twit')

console.log("Tweet random resource")
run()

async function run() {
    const twitterClient = new Twit({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })

    const service = new MarkdownContentService()
    const categories = await service.GetCategories()
    const items = await service.GetItems()

    const item = items[Math.floor(Math.random() * items.length)]
    const category = categories.find(i => i.id === item.category.id)
    
    const text = `
${category?.emoji} ${item.title}
by ${item.authors.join(' ')}

Check it out at 👇
${item.url}`

    try {
        twitterClient.post('statuses/update', { status: text }, function (err: any, data: any, response: any) {
            if (err) {
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
        console.log('Unable to post Twitter update..')
        console.error(e)
    }
}
