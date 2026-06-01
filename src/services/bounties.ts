import { BountySource } from 'types/bounty'

export function GetBountySources(): BountySource[] {
  return [
    {
      title: 'Gitcoin Bounties',
      description: 'Explore open Web3 bounties from Gitcoin and find tasks across ecosystems, protocols, and developer tooling.',
      url: 'https://bounties.gitcoin.co/explorer',
      tags: ['Bounties', 'Open Source', 'Ethereum'],
      level: 'Beginner',
      platform: 'Gitcoin',
    },
    {
      title: 'Dework Bounties',
      description: 'Discover DAO tasks, contribution boards, and bounty opportunities from Web3 communities using Dework.',
      url: 'https://app.dework.xyz/bounties',
      tags: ['DAO', 'Bounties', 'Community'],
      level: 'Beginner',
      platform: 'Dework',
    },
    {
      title: 'Layer3 Quests',
      description: 'Complete curated Web3 quests and campaigns to learn protocols while earning rewards and credentials.',
      url: 'https://layer3.xyz/quests',
      tags: ['Quests', 'Rewards', 'Learning'],
      level: 'Beginner',
      platform: 'Layer3',
    },
    {
      title: 'Questbook Grants',
      description: 'Browse grant programs and funded contribution opportunities from Web3 ecosystems and protocols.',
      url: 'https://questbook.app/',
      tags: ['Grants', 'Bounties', 'Funding'],
      level: 'Intermediate',
      platform: 'Questbook',
    },
    {
      title: 'OnlyDust',
      description: 'Find open-source Web3 projects that reward contributors for issues, pull requests, and ongoing maintenance.',
      url: 'https://app.onlydust.com/projects',
      tags: ['Open Source', 'Bounties', 'Contribute'],
      level: 'Intermediate',
      platform: 'OnlyDust',
    },
    {
      title: 'Superteam Earn',
      description: 'Browse crypto bounties, grants, and freelance opportunities from the Superteam ecosystem.',
      url: 'https://earn.superteam.fun/',
      tags: ['Bounties', 'Freelance', 'Solana'],
      level: 'Intermediate',
      platform: 'Superteam',
    },
  ]
}
