import React, { FormEvent, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from '../pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { CompanyForm } from 'components/form/company'
import { JobForm } from 'components/form/job'
import { OrderForm } from 'components/form/order'
import { Organization, defaultOrg } from 'types/org'
import { defaultJob, Job } from 'types/job'
import { Order, defaultOrder } from 'types/order'
import { Finished } from 'components/form/finished'
import { useWarnIfUnsavedChanges } from 'hooks/useWarnIfUnsavedChanges'
import { useRouter } from 'next/router'
import { TopnavLayout } from 'components/layouts/topnav'

interface Props {
  categories: Array<Category>
}

export default function Index(props: Props) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [org, setOrg] = useState<Organization>(defaultOrg)
  const [job, setJob] = useState<Job>(defaultJob)
  const [order, setOrder] = useState<Order>(defaultOrder)
  useWarnIfUnsavedChanges(`Are you sure you want to leave this page? Information you've entered may not be saved..`, step > 1)

  useEffect(() => {
    async function asyncEffect() {
      const response = await fetch(`/api/org/job/${router.query.id}`)
      if (response.status !== 200) return

      const body = await response.json()
      setOrg((current) => {
        return { ...current, id: body.data.org.id }
      })
      setJob(body.data)
      setStep(3)
    }

    if (router.query.id) asyncEffect()
  }, [router.query.id])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step === 1) {
      if (org.id) {
        setStep(step + 1)
        return
      }

      const response = await fetch('/api/org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          org: org,
        }),
      })

      if (response.status === 200) {
        const body = await response.json()
        setOrg({ ...org, id: body.data })
        setStep(step + 1)
        return
      }
    }

    if (step === 2) {
      job.org = org
      const response = await fetch('/api/org/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job: job,
        }),
      })

      if (response.status === 200) {
        const body = await response.json()
        setJob({ ...job, id: body.data })
        setStep(step + 1)
        return
      }
    }

    if (step === 3) {
      order.jobId = job.id
      const response = await fetch('/api/org/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: order,
        }),
      })

      if (response.status === 200) {
        const body = await response.json()
        setOrder({ ...order, id: body.data })
        setStep(step + 1)
        return
      }
    }
  }

  async function reset() {
    setOrg(defaultOrg)
    setJob(defaultJob)
    setOrder(defaultOrder)
    setStep(1)
  }

  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title={`Post Web3 jobs`}
        description={`Reach hundreds of thousands of Web3, Solidity and blockchain developers, designers, researchers and other builders.`}
      />

      <TopnavLayout className={styles.container} title={'Post Web3 Job'} hideNewsletter>
        We are no longer accepting new job postings. Please check back later!
        {/* <form onSubmit={handleSubmit} role="form">
          {step === 1 && <CompanyForm org={org} onChange={(i) => setOrg(i)} />}
          {step === 2 && <JobForm job={job} onChange={(i) => setJob(i)} />}
          {step === 3 && <OrderForm job={job} order={order} onChange={(i) => setOrder(i)} />}
          {step === 4 && <Finished org={org} job={job} order={order} />}

          {step < 4 && (
            <button type="submit" className="accent block searchButton">
              Next &raquo;
            </button>
          )}
          {step === 4 && (
            <button type="button" className="accent block searchButton" onClick={reset}>
              Post another job
            </button>
          )}
        </form> */}
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  return {
    props: {
      categories,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
