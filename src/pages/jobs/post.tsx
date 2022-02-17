import React, { FormEvent, useState } from 'react'
import { GetStaticProps } from 'next'
import { Main as MainLayout } from 'components/layouts/main'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from '../pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { CompanyForm } from 'components/form/company'
import { JobForm } from 'components/form/job'
import { OrderForm } from 'components/form/order'
import { Company, defaultCompany } from 'types/company'
import { defaultJob, Job } from 'types/job'
import { Order, defaultOrder } from 'types/order'
import { Finished } from 'components/form/finished'

interface Props {
  categories: Array<Category>
}

export default function Index(props: Props) {
  const [step, setStep] = useState(1)
  const [company, setCompany] = useState<Company>(defaultCompany)
  const [job, setJob] = useState<Job>(defaultJob)
  const [order, setOrder] = useState<Order>(defaultOrder)

  // TODO: Leaving page notification

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step === 1) {
      if (company.id) {
        setStep(step + 1)
        return
      }

      const response = await fetch('/api/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: company,
        }),
      })

      if (response.status === 200) {
        const body = await response.json()
        setCompany({ ...company, id: body.data })
        setStep(step + 1)
        return
      }
    }

    if (step === 2) {
      job.company = company
      const response = await fetch('/api/company/job', {
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
      const response = await fetch('/api/company/order', {
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
    setCompany(defaultCompany)
    setJob(defaultJob)
    setOrder(defaultOrder)
    setStep(1)
  }

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={`Post Web3 jobs`} description={`Reach hundreds of thousands of Web3, Solidity and blockchain developers, designers, researchers and other builders.`} />

      <MainLayout className={styles.container} title={'Post Job'} hideNewsletter>
        <form onSubmit={handleSubmit} role='form'>
          {step === 1 && <CompanyForm company={company} onChange={i => setCompany(i)} />}
          {step === 2 && <JobForm job={job} onChange={i => setJob(i)} />}
          {step === 3 && <OrderForm order={order} onChange={i => setOrder(i)} />}
          {step === 4 && <Finished company={company} job={job} order={order} />}

          {step < 4 && <button type="submit" className="accent block searchButton">Next &raquo;</button>}
          {step === 4 && <button type="button" className="accent block searchButton" onClick={reset}>Post another job</button>}
        </form>
      </MainLayout>
    </NavigationProvider>
  )
}


export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  return {
    props: {
      categories,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
