import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Featured } from 'components/featured'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from '../pages.module.scss'
import { Job } from 'types/job'
import { Organization } from 'types/org'
import { marked } from 'marked'
import { MarkdownContentService } from 'services/content'
import { LinkButton } from 'components/link-button'
import { TopnavLayout } from 'components/layouts/topnav'
import { JobPanel } from 'components/panel'
import { GetJobs } from 'services/job'

interface Props {
  categories: Array<Category>
  org: Organization | null
  jobs: Array<Job>
}

interface Params extends ParsedUrlQuery {
  org: string
}

export default function Index(props: Props) {
  if (!props.org) {
    return <></>
  }

  const isFeatured = props.jobs.some((i) => i.featured)

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={`Jobs at ${props.org.title}`} description={props.org.description} imageUrl={props.org.logo} />

      <TopnavLayout className={styles.container} title={props.org.title}>
        {props.org.body && (
          <article className={styles.body} dangerouslySetInnerHTML={{ __html: marked.parse(props.org.body) }} />
        )}
        {!props.org.body && props.org.description && (
          <article className={styles.body} dangerouslySetInnerHTML={{ __html: props.org.description }} />
        )}

        {isFeatured && (props.org.website || props.org.twitter || props.org.github) && (
          <div className={styles.icons}>
            {props.org.website && <LinkButton href={props.org.website} text="Website" type="website" />}
            {props.org.twitter && (
              <LinkButton href={`https://twitter.com/${props.org.twitter}`} text="Twitter" type="twitter" />
            )}
            {props.org.github && <LinkButton href={props.org.github} text="Github" type="github" />}
          </div>
        )}

        <h3>Jobs</h3>
        <main>
          <Featured type="rows">
            {props.jobs.map((i) => {
              return <JobPanel key={i.id} job={i} />
            })}
          </Featured>
        </main>
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const jobs = await GetJobs()
  const companies = Array.from(new Set(jobs.map((i) => i.org.id)))

  return {
    paths: companies.map((i) => {
      return {
        params: { org: i },
      }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const orgId = context.params?.org as string
  if (!orgId) {
    return {
      props: null,
      notFound: true,
    }
  }

  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const jobs = await GetJobs()
  const org = jobs.length > 0 ? jobs[0].org : null

  return {
    props: {
      categories,
      org,
      jobs,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
