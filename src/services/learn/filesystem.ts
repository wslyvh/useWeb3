import fs from 'fs'
import matter from 'gray-matter'
import { resolve, join } from 'path'
import { Lesson, Track } from 'types/learn'

export function GetTrackIDs(): Array<string> {
  return GetTracks().map((i) => i.id)
}

export function GetTracks(): Array<Track> {
  const dir = resolve(process.cwd(), 'learn')
  const dirs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (i) =>
        i.isDirectory() &&
        fs.readdirSync(join(dir, i.name), { withFileTypes: true }).some((i) => i.isFile() && i.name.endsWith('.md'))
    )

  return dirs.map((i) => {
    const trackDir = join(dir, i.name)
    const metadataPath = join(trackDir, 'metadata.json')
    const content = fs.readFileSync(metadataPath, 'utf8')

    if (!content) {
      console.log('File has no content..', i.name)
    }

    const lessons = fs
      .readdirSync(trackDir, { withFileTypes: true })
      .filter((i) => i.isFile() && i.name.endsWith('.md'))
      .map((i) => {
        const fullPath = join(trackDir, i.name)
        const content = fs.readFileSync(fullPath, 'utf8')

        if (!content) {
          console.log('File has no content..', i.name)
          return
        }

        const doc = matter(content)
        return {
          id: i.name.replace('.md', ''),
          body: doc.content,
          ...doc.data,
        } as Lesson
      })
      .filter((i) => !!i) as Array<Lesson>

    return {
      id: i.name.replace('.md', ''),
      lessons: lessons,
      ...JSON.parse(content),
    } as Track
  })
}

export function GetTrack(id: string): Track | undefined {
  return GetTracks().find((i) => i.id === id)
}
