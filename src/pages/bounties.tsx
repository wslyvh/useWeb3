import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { ContentItem } from 'types/content-item'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { TopnavLayout } from 'components/layouts/topnav'
import { SEO } from 'components/SEO'
import { Featured } from 'components/featured'
import { PanelCard } from 'components/panel'

interface Props {
  categories: Array<Category>
  items: Array<ContentItem>
}

interface Params extends ParsedUrlQuery {
  category: string
}

const bountyPlatforms = [
  {
    title: 'Gitcoin',
    icon: '🌱',
    description: 'A community for developers to collaborate and monetize their skills while working on Open Source projects through bounties and grants.',
    url: 'https://gitcoin.co/explorer',
    level: 'All' as const,
    tags: ['Open Source', 'Grants', 'Bounties'],
  },
  {
    title: 'Dework',
    icon: '🛠️',
    description: 'A web3-native project management tool with token payments, credentialing, and bounties for DAOs and Web3 projects.',
    url: 'https://app.dework.xyz/',
    level: 'All' as const,
    tags: ['DAOs', 'Tasks', 'Bounties'],
  },
  {
    title: 'Layer3',
    icon: '🎯',
    description: 'Discover and complete bounties across the Web3 ecosystem. Earn tokens and credentials for completing tasks.',
    url: 'https://layer3.xyz/',
    level: 'Beginner' as const,
    tags: ['Quests', 'Learn', 'Earn'],
  },
  {
    title: 'Immunefi',
    icon: '🛡️',
    description: 'The leading bug bounty platform for smart contracts. Find vulnerabilities and earn rewards from top DeFi protocols.',
    url: 'https://immunefi.com/',
    level: 'Advanced' as const,
    tags: ['Security', 'Bug Bounty', 'DeFi'],
  },
  {
    title: 'Replit Bounties',
    icon: '💻',
    description: 'Get paid to code. Find bounties from projects looking for developers to build features and fix bugs.',
    url: 'https://replit.com/bounties',
    level: 'All' as const,
    tags: ['Coding', 'Development', 'Bounties'],
  },
  {
    title: 'Buidlbox',
    icon: '📦',
    description: 'Discover hackathons and bounties in the Web3 space. Build projects and win prizes.',
    url: 'https://buidlbox.io/',
    level: 'Intermediate' as const,
    tags: ['Hackathons', 'Bounties', 'Building'],
  },
]

export default function Bounties(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title="Bounties"
        divider="💰"
        description="Discover Web3 bounties and earn crypto by contributing to open-source projects, finding bugs, and completing tasks."
      />
      <TopnavLayout className={styles.container} title="Web3 Bounties">
        <article>
          <p>
            Bounties are a great way to earn crypto while contributing to the Web3 ecosystem.
            Whether you&apos;re a developer looking to contribute to open-source projects,
            a security researcher hunting for vulnerabilities, or someone completing tasks for DAOs.
          </p>
          <p>
            Explore the platforms below to find bounties that match your skills and interests.
          </p>
        </article>

        <Featured className={styles.featured} title="Bounty Platforms">
          {bountyPlatforms.map((platform) => (
            <PanelCard
              key={platform.title}
              title={platform.title}
              icon={platform.icon}
              description={platform.description}
              url={platform.url}
              level={platform.level}
              tags={platform.tags}
            />
          ))}
        </Featured>

        <article>
          <h2>Types of Bounties</h2>
          <ul>
            <li><strong>Bug Bounties</strong> - Find security vulnerabilities in smart contracts and protocols</li>
            <li><strong>Development Bounties</strong> - Build features, fix bugs, and contribute code</li>
            <li><strong>Content Bounties</strong> - Create documentation, tutorials, and educational content</li>
            <li><strong>Design Bounties</strong> - Design UI/UX, graphics, and branding materials</li>
            <li><strong>Translation Bounties</strong> - Translate content to different languages</li>
          </ul>
        </article>

        <article>
          <h2>Getting Started</h2>
          <p>
            New to bounties? Here are some tips to get started:
          </p>
          <ol>
            <li>Create accounts on the platforms listed above</li>
            <li>Start with smaller bounties to build your reputation</li>
            <li>Read the requirements carefully before starting</li>
            <li>Communicate with the project team if you have questions</li>
            <li>Submit quality work to increase your chances of getting paid</li>
          </ol>
        </article>
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const service = new MarkdownContentService()
  const items = await service.GetItems('', true)
  const categories = await service.GetCategories()

  return {
    props: {
      items,
      categories,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
