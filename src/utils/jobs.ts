// Engineering & Software Development => Execute Development
const engineering = [
  'software',
  'develop',
  'engineer',
  'fullstack',
  'full-stack',
  'full stack',
  'frontend',
  'front-end',
  'front end',
  'backend',
  'back-end',
  'back end',
  'data',
  'devops',
  'qa',
  'testing',
  'security',
  'protocol',
  'solidity',
  'smartcontract',
  'smart-contract',
  'smart contract',
  'technical',
  'technician',
  'coder',
  'evangelist',
]

// Product & Design => Prioritize Development
const product = ['product', 'design', 'ui', 'ux', 'graphic', 'visual', 'creative', 'agile', 'scrum', 'analytics']

// Sales & Business Development => Close Pipeline
const sales = [
  'business',
  'business development',
  'bizdev',
  'biz dev',
  'bisdev',
  'bis dev',
  'busdev',
  'bus dev',
  'sales',
  'partnership',
  'b2b',
]

// Marketing & Communications => Generate Pipeline
const marketing = ['communication', 'community', 'marketing', 'marketer', 'growth', 'content', 'brand', 'social']

// People & HR => Enable People
const people = ['people', 'talent', 'hr', 'recruiter', 'recruitment']

// Operations & Customer Success
const operations = ['customer', 'support', 'client', 'operations', 'facilitator']

// Non-Tech, Finance, Legal
const nontech = ['finance', 'legal', 'compliance', 'corporate', 'office', 'administrative']

export const DEPARTMENTS = ['Engineering', 'Product', 'Sales', 'Marketing', 'People', 'Operations', 'Non-Tech']

export function getJobDepartment(value: string): string {
  if (engineering.some((i) => value.toLowerCase().includes(i))) {
    return 'Engineering'
  }

  if (product.some((i) => value.toLowerCase().includes(i))) {
    return 'Product'
  }

  if (sales.some((i) => value.toLowerCase().includes(i))) {
    return 'Sales'
  }

  if (marketing.some((i) => value.toLowerCase().includes(i))) {
    return 'Marketing'
  }

  if (people.some((i) => value.toLowerCase().includes(i))) {
    return 'People'
  }

  if (operations.some((i) => value.toLowerCase().includes(i))) {
    return 'Operations'
  }

  if (nontech.some((i) => value.toLowerCase().includes(i))) {
    return 'Non-Tech'
  }

  return 'Other'
}

export function getJobFilter(value: string) {}

export function getTags(value: string) {
  const tags = new Array<string>()

  return tags
}

export function getApplicationUrl(url: string) {
  if (url.startsWith('mailto:')) { 
    return url
  }

  return `${url}?utm_source=useweb3.xyz&ref=useweb3.xyz`
}