import { SITE_URL } from 'utils/constants'
import { JobService } from 'services/jobs'
import slugify from 'slugify'
import { MarkdownContentService } from 'services/content'
import { DEPARTMENTS } from 'utils/jobs'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }: any) => {
  const service = new MarkdownContentService()
  const items = await service.GetItems()
  const categories = await service.GetCategories()
  const tags = (await service.GetTags()).map((i) => i.key.toLowerCase().replace(/ /g, '%20').replace(/&/g, '%26'))

  const jobService = new JobService()
  const jobs = await jobService.GetJobs()
  const companies = Array.from(new Set(jobs.map((i) => i.company.id)))

  const baseUrl = SITE_URL
  const currentDate = new Date().toISOString()
  const launchDate = new Date(2021, 8).toISOString()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${baseUrl}</loc>
                <lastmod>${currentDate}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
            </url>
            ${categories
              .map((i) => {
                return `
                    <url>
                        <loc>${baseUrl}${i.id}</loc>
                        <lastmod>${currentDate}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.8</priority>
                    </url>`
              })
              .join('')}
            ${items
              .map((i) => {
                return `
                    <url>
                        <loc>${baseUrl}${i.category.id}/${i.id}</loc>
                        <lastmod>${new Date(i.dateAdded).toISOString()}</lastmod>
                        <changefreq>monthly</changefreq>
                        <priority>0.5</priority>
                    </url>`
              })
              .join('')}
            <url>
                <loc>${baseUrl}tags</loc>
                <lastmod>${launchDate}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.6</priority>
            </url>
            ${tags
              .map((i) => {
                return `
                    <url>
                        <loc>${baseUrl}tags/${i}</loc>
                        <lastmod>${currentDate}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>0.7</priority>
                    </url>`
              })
              .join('')}
            <url>
                <loc>${baseUrl}jobs</loc>
                <lastmod>${currentDate}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
            </url>
            ${companies
              .map((i) => {
                return `
                    <url>
                        <loc>${baseUrl}jobs/${i}</loc>
                        <lastmod>${currentDate}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.7</priority>
                    </url>`
              })
              .join('')}
            ${DEPARTMENTS.map((i) => {
              return `
                    <url>
                        <loc>${baseUrl}/${i.toLowerCase()}-jobs</loc>
                        <lastmod>${currentDate}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.8</priority>
                    </url>`
            }).join('')}
            ${jobs
              .map((i) => {
                return `
                    <url>
                        <loc>${baseUrl}jobs/${i.company.id}/${slugify(i.title, {
                  lower: true,
                  strict: true,
                  trim: true,
                })}</loc>
                        <lastmod>${currentDate}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>0.6</priority>
                    </url>`
              })
              .join('')}
        </urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
