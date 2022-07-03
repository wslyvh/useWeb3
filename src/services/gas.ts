import * as dotenv from 'dotenv'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { GasPrice, Heatmap } from 'types/gas'
import moment from 'moment'

dotenv.config()

export class GasPriceService {
  private client: SupabaseClient

  constructor() {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      throw new Error('Supabase URL or API Key not set.')
    }

    this.client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  }

  public async GetPrices(days: number = 7): Promise<Array<GasPrice>> {
    const since = moment.utc().subtract(7, 'day').subtract(1, 'hour') // subtract 1 additional hr
    const query = await this.client.from<GasPrice>('gas').select('*').gte('created', since.toISOString())

    if (query.error) {
      console.log('Unable to get gas price data..')
      console.error(query.error.message)
    }

    return query.data ?? []
  }

  public AsHeatmapData(data: Array<GasPrice>, days: number = 7): Heatmap {
    const hoursPerDay = 24
    const xDayOfTheWeek = new Array(days)
      .fill(0)
      .map((_, i) => moment.utc().subtract(i, 'd').format('ddd'))
      .reverse()
    const weekDays = xDayOfTheWeek.map((i) => moment().day(i).weekday())
    const yHoursInTheDay = new Array(hoursPerDay).fill(0).map((_, i) => `${i}:00`)
    const hoursInTheDay = new Array(hoursPerDay).fill(0).map((_, i) => i)

    const current = moment.utc()
    const heatmap = hoursInTheDay.map((hourOfTheDay) => {
      return weekDays.map((weekDay) => {
        if (weekDay === current.weekday() && hourOfTheDay > current.hour()) {
          return null
        }

        const baseFeesPerHr = data.filter((i) => moment(i.created).format('d:H') === `${weekDay}:${hourOfTheDay}`).map((i) => i.baseFee)
        const avg = baseFeesPerHr.length > 0 ? baseFeesPerHr.reduce((a, b) => a + b, 0) / baseFeesPerHr.length : 0
        return avg ? Math.floor(avg) : 0
      })
    })

    // data[0] = 00:00 = [mon, tue, wed, thu, fri, sat, sun]
    // data[1] = 01:00 = [mon, tue, wed, thu, fri, sat, sun]
    // etc..

    return {
      x: xDayOfTheWeek,
      y: yHoursInTheDay,
      data: heatmap,
    }
  }
}
