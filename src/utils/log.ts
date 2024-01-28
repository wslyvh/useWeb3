import fs from 'fs'
import path from 'path'

export function writeTimeLog(name: string, date: string) {
  const filename = path.join('logs', name)
  fs.writeFileSync(filename, date)
}

export function getTimeLog(name: string) {
  const filename = path.join('logs', name)
  const content = fs.readFileSync(filename)

  return content.toString()
}
