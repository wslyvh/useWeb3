import { join } from 'path'
import fs from 'fs'

const main = async () => {
  const data = join(__dirname, '../../data')
  console.log('Files in data directory', data)
  fs.readdirSync(data, { withFileTypes: true }).forEach(i => {
    console.log('  -', i.name)
  })

  // const file = join(__dirname, '../../data', 'jobs.json')
  const file = join(__dirname, '../../data', 'date.txt')
  console.log('Creating file', file)
  fs.writeFileSync(file, new Date().getTime().toString())
}

main()
