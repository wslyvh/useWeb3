import * as dotenv from 'dotenv'
import fs from 'fs'
import fetch from 'cross-fetch'
import path from 'path'
import { GetOrganizations } from '../services/jobs'

dotenv.config()

console.log('Import org logos')
run()

const dir = path.join(__dirname, `../../public/assets/orgs`)
fs.mkdir(dir, { recursive: true }, () => '')

async function run() {
  const orgs = await GetOrganizations()
  const handles = orgs.map((i) => i.twitter?.replaceAll('@', '')).filter((i) => !!i) as string[]

  console.log('Orgs', orgs.length)
  console.log('Handles', handles.length)

  Promise.all(handles.map((i) => fetchAndSave(i))).then((results) => {
    const total = results.length

    console.log(`Total: ${total}`)
    console.log(`Failed: ${results.filter((i) => i === false).length}`)
  })
}

async function fetchAndSave(handle: string) {
  // console.log('Fetching', handle)

  try {
    const response = await fetch(`https://unavatar.io/twitter/${handle}`)
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    fs.writeFileSync(`${dir}/${handle}.png`, buffer)
    return true
  } catch (e) {
    console.log('Unable to fetch', handle)
    console.error(e)
    return false
  }
}
