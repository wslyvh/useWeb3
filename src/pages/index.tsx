/* eslint-disable prettier/prettier */
import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { Featured } from 'components/featured'
import { ContentItem } from 'types/content-item'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { TopnavLayout } from 'components/layouts/topnav'
import { HackathonPanel, PanelCard } from 'components/panel'
import { TitleWithAction } from 'components/layouts/title-action'
import { Tags } from 'components/tags'
import { toTags } from 'utils/helpers'
import { fetchHackathonData } from 'services/hackathon'

interface HackathonProps {
  Event: string,
  startDate: string,
  endDate: string,
  Geo: string,
  Link: string,
  Twitter: string,
  Chat: string
}

interface Props {
  categories: Array<Category>
  items: Array<ContentItem>
  hackathons: Array<HackathonProps>;
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <TopnavLayout className={styles.container}>
        <article>
          <p>
            useWeb3 is a platform for developers to explore and learn about Web3. Whether you&apos;re a new dev getting your hands dirty for the first
            time, or a seasoned developer making the transition into the Web3 space.
          </p>
          <p>
            <strong>Explore. Learn. Build.</strong>
          </p>
        </article>

        <article>
          <TitleWithAction title="Web3 Jobs" />
          {/* <TitleWithAction title="Web3 Jobs" action={{ href: '/jobs/post', text: 'Post a Job' }} /> */}
          <p>Browse all jobs to find your Web3, Solidity or blockchain job at one of the leading companies in the space.</p>
          <p className={styles.filters}>
            <Tags
              fill
              asJobs
              tags={toTags(['Engineering', 'Smart Contract', 'Full-stack', 'Back-end', 'Front-end', 'DevRel', 'Product', 'Design'])}
            />
          </p>
        </article>

        <article>
          <h2>Start learning</h2>
          <p>
            Explore the latest resources and get familiar with the core concepts and fundamentals. Learning from tutorials, courses, books, videos or
            code challenges and start building!
          </p>
        </article>

        <article>
          <TitleWithAction title="Latest Hackathons" />
          {props.hackathons.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
              {props.hackathons.map((item, index) => (
                <HackathonPanel
                  key={index}
                  Event={item.Event}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  Geo={item.Geo}
                  Twitter={item.Twitter}
                  Chat={item.Chat}
                  Link={item.Link}
                />
              ))}
            </div>
          ) : (
            <p>No hackathons found in month or year </p>
          )}
        </article>

        {props.categories.map((category) => {
          const items = props.items.filter((item) => item.category.id === category.id)
          if (items.length === 0) return null
// return <Slider title={category.title} items={items} />

          return (
            <Featured key={category.id} className={styles.featured} title={category.title} link={category.id}>
              {items.map((i) => {
                return (
                  <PanelCard
                    key={i.id}
                    title={i.title}
                    icon={i.category.emoji}
                    description={i.description}
                    url={i.url}
                    detailsUrl={`/${i.category.id}/${i.id}`}
                    level={i.level}
                    tags={i.tags}
                  />
                )
              })}
            </Featured>
          )
        })}
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const service = new MarkdownContentService();
  const items = await service.GetItems('', true);
  const categories = await service.GetCategories();
  const hackathons = await fetchHackathonData();

  // Ensure that hackathons array has the correct structure
  const formattedHackathons = hackathons.map((hackathon) => ({
    Event: hackathon.Event || '', // Assuming 'Event' is the correct property name
    startDate: hackathon.startDate || '',
    endDate: hackathon.endDate || '',
    Geo: hackathon.Geo || '',
    Link: hackathon.Link || '',
    Twitter: hackathon.Twitter || '',
    Chat: hackathon.Chat || '',
  }));

  return {
    props: {
      items,
      categories,
      hackathons: formattedHackathons,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  };
};
