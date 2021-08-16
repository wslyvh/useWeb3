import React from 'react'
import { Main as MainLayout } from 'components/layouts/main'
import styles from './submit.module.scss'

export default function Index() {
  return (
    <MainLayout title='Submit a link' className={styles.container}>
      <section>
          <p>
              useWeb3 provides a curated overview of the best and latest resources on Ethereum, blockchain and Web3 development. Resources should be up-to-date, relevant for developers and publicly available. 
          </p>
          <p>
              Please use the form below to submit a link. We will manually review each submission before deciding to publish it to the site.
          </p>

          <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
          <iframe
              className="airtable-embed airtable-dynamic-height" 
              src="https://airtable.com/embed/shrOIsIgZND1MKR16?backgroundColor=red" 
              frameBorder={0}
              width="100%" 
              height="1894">
          </iframe>
      </section>
    </MainLayout>
  )
}
