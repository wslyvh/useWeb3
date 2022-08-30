import * as dotenv from 'dotenv'
import snoowrap from 'snoowrap'

console.log('Test Reddit API Access')
dotenv.config()
run()

//r/ethdev
// - Question 5ff04f94-f445-11e5-a42c-0e8c140fd37f
// - Code assistance 1bf7d4a2-c710-11ec-b0e6-1280e52d18c6
// - Tutorial 0acc22c2-f445-11e5-bcb2-0ee43ad8a7ed
// - My Project 95e9673a-f444-11e5-9bbc-0ee43ad8a7ed
// - Information 9fdf3a6c-3fbf-11e8-be16-0e3a6340ec36
// - Please Set Flair 17648116-cb20-11eb-a663-0e678ed142e1

//r/ethereumnoobies
// - Discussion 3ae61ae8-195c-11e7-acaa-0e0bfb1a8e84
// - News 3d361564-195c-11e7-84b7-0edd91f581ee
// - Fundamentals 4fd9ddfe-195c-11e7-9604-0e2eedc57f4e
// - Wallets 53eb29de-195c-11e7-a226-0e1e04475714
// - Exchanges 696b942e-195c-11e7-9e56-0ef50a472880
// - Request 7d26ea72-195c-11e7-835d-0e2d3db5b0aa
// - Warnings 86913a18-195c-11e7-a07b-0eef3644f7d2
// - Educational 916d9bb6-195c-11e7-bbf8-0e0bfb1a8e84
// - Support e09a688a-195d-11e7-bf4f-0efb8a48eb76
// - Announcement edb6718a-195d-11e7-a1ff-0efe7960d146
// - Question 8996e880-1960-11e7-9d7a-0e403b81dfd8
// - Tokens 313d45ca-1961-11e7-8e7f-0e18eff2c8e2

//r/eth
// - r/Ethereum f3a929da-cd43-11ec-9a03-a295d7d1c45e
// - r/EthStaker 766a7b0e-cd4d-11ec-b643-866927c8b777
// - r/EthFinance 91ab9820-cd44-11ec-94e7-1aa4cf9cc392
// - r/EthTrader 77ced6f0-cd45-11ec-981e-9a1bcaedfe9c
// - r/EtherMining 008c5458-cd47-11ec-b789-ea33c239ee79
// - r/EthDev 9d1b4a2e-cd45-11ec-a278-22915d55d8c1
// - r/EthereumNoobies 5692ba3c-cd46-11ec-ac02-ee7370f74b5e

async function run() {
  const flairs = ['Tutorial', 'My Project', 'Fundamentals', 'Educational', 'r/EthDev', 'r/EthereumNoobies']
  const subreddits = ['ethdev', 'ethereumnoobies', 'eth', 'ethereum', 'ethdevjobs']
  // No flairs: ethereum, ethdevjobs

  const client = new snoowrap({
    userAgent: 'useWeb3',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
  })

  // console.log('GET Flairs')
  // const flairs = await client.getSubreddit('ethdev').getLinkFlairTemplates()
  // flairs.forEach(i => console.log('-', i.flair_text, i.flair_template_id))

  const subsQuery = `(subreddit:${subreddits.join(' OR subreddit:')})`
  const flairsQuery = `(flair:${flairs.join(' OR flair:')})`

  const results = await client.search({
    query: `${subsQuery} AND ${flairsQuery}`,
    time: 'week',
    sort: 'top',
    limit: 20
  })
  results.forEach((i) => {
    console.log(`- ${i.created_utc} ${i.subreddit_name_prefixed} (${i.link_flair_text})`)
    console.log(i.title)
    console.log(i.url)
    console.log()
  })
    
  // console.log('SUBMIT Link')
  // client.getSubreddit('ethereumnoobies').submitLink({
  //   subredditName: 'ethereumnoobies',
  //   title: 'Learn Web3 Development @ useWeb3',
  //   url: 'https://www.useweb3.xyz/',
  //   flairId: '916d9bb6-195c-11e7-bbf8-0e0bfb1a8e84'
  // }).then(i => console.log('OK', i))
}
