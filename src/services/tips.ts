import * as dotenv from 'dotenv'
import Airtable from 'airtable'

dotenv.config()

if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_API_KEY) {
  throw new Error('Airtable API Base or Key not set.')
}

const client: Airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
const base: Airtable.Base = client.base(process.env.AIRTABLE_API_BASE ?? '')

export async function GetRandomTip(): Promise<string | undefined> {
  try {
    const records = await base('Tips').select().all()
    const tips = records.map((source) => source.fields['Text'] as string)

    return tips[Math.floor(Math.random() * tips.length)]
  } catch (e) {
    console.log('GetTips', 'Unable to fetch tips')
    console.error(e)
  }
}
