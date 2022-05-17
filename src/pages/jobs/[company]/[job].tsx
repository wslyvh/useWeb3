import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from 'pages/pages.module.scss'
import { JobService } from 'services/jobs'
import { Job } from 'types/job'
import moment from 'moment'
import { Company } from 'types/company'
import { Link } from 'components/link'
import { marked } from 'marked'
import he from 'he'
import { MarkdownContentService } from 'services/content'
import { getApplicationUrl } from 'utils/jobs'
import { TopnavLayout } from 'components/layouts/topnav'
import { Panel } from 'components/panel'

interface Props {
  categories: Array<Category>
  company: Company | undefined
  job: Job | undefined
}

interface Params extends ParsedUrlQuery {
  company: string
  job: string
}

export default function Index(props: Props) {
  if (!props.company || !props.job) {
    return <></>
  }

  const body = props.job.body ?? ''
  const basicFormatting = new RegExp(/\s(__|\*\*)(?!\s)(.(?!\1))+(?!\s(?=\1))/).test(body)
  const boldFormatting = new RegExp(/\*(.+?)\*/s).test(body) || new RegExp(/\**(.+?)\**/s).test(body)
  const italicFormatting = new RegExp(/_(.+?)_/s).test(body) || new RegExp(/__(.+?)__/s).test(body)
  const linkFormatting = new RegExp(/\[(.+)\]\(([^ ]+?)( "(.+)")?\)/).test(body)
  const listFormatting = new RegExp(/(^(\W{1})(\s)(.*)(?:$)?)+/).test(body)
  const headingFormatting = new RegExp(/^(#{1,6}\s*[\S]+)/).test(body) || body.includes('## ') || body.includes('### ')
  const content =
    props.job.asMarkdown ||
    boldFormatting ||
    basicFormatting ||
    italicFormatting ||
    linkFormatting ||
    listFormatting ||
    headingFormatting
      ? marked.parse(body)
      : body
  const html = he.decode(content)

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={props.job.title} description={props.job.description} imageUrl={props.company.logo} />

      <TopnavLayout className={styles.container} title={props.job.title}>
        <ul className={styles.properties}>
          <li>
            <span>🏛️</span>
            <Link className={styles.mr} href={`/jobs/${props.company.id}`}>
              {props.company.title}
            </Link>
          </li>
          {props.job.minSalary !== undefined && props.job.maxSalary !== undefined && (
            <li>
              <span>💰</span>
              <span>
                ${props.job.minSalary.toLocaleString()} - ${props.job.maxSalary.toLocaleString()}/year
              </span>
            </li>
          )}
          <li>
            <span>🏷️</span>
            <span>
              <Panel small type="secondary">
                {props.job.department}
              </Panel>
            </span>
          </li>
          <li>
            <span>🌐</span>
            <span>
              {props.job.remote && (
                <Panel small type="secondary">
                  {props.job.location}
                </Panel>
              )}
              {!props.job.remote && props.job.location}
            </span>
          </li>
          {props.job.parttime && (
            <li>
              <span>🕓</span>
              <span>
                <Panel small type="secondary">
                  Part-time
                </Panel>
              </span>
            </li>
          )}
          {props.job.updated && (
            <li>
              <span>📅</span>
              <span className={styles.muted}>{moment(props.job.updated).fromNow(true)} ago</span>
            </li>
          )}
        </ul>

        <article className={styles.website}>
          <Link href={getApplicationUrl(props.job.url)}>
            <span className="accent block">Apply to job &raquo;</span>
          </Link>
        </article>

        <h3>Description</h3>
        {props.job.body && <main className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />}
        {!props.job.body && (
          <main className={styles.body}>
            Apply for the role of {props.job.title} at {props.company.title}.
          </main>
        )}
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new JobService()
  const jobs = await service.GetJobs()

  return {
    paths: jobs.map((i) => {
      if (!i.slug) console.log(i.company.id, i.title)
      return {
        params: { company: i.company.id, job: i.slug },
      }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const companyId = context.params?.company
  const jobId = context.params?.job
  if (!companyId || !jobId) {
    return {
      props: null,
      notFound: true,
    }
  }

  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const jobService = new JobService()
  const jobs = await jobService.GetJobs(companyId)
  const company = jobs.length > 0 ? jobs[0].company : undefined
  const job = jobs.find((i) => i.slug === jobId)

  return {
    props: {
      categories,
      company,
      job,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
