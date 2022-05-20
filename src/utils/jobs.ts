export const STANDARD_PRICE = 25
export const FEATURED_PRICE = 99
export const DISCOUNT_PERCENTAGE = 10
export const ACCEPTED_NETWORK_IDS = [1, 10, 42161]
export const RECEIVER_ADDRESS = '0xA512C3cF9A63715CEd87DE5058c684cBFF9f4321'
export const RECEIVER_ENS = 'useweb3.eth'

export function getPrice(type: string): number {
  switch (type) {
    case 'Featured':
      return FEATURED_PRICE
  }

  return STANDARD_PRICE
}

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
const business = [
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
  'ecosystem',
]

// Marketing & Communications => Generate Pipeline
const marketing = [
  'communication',
  'community',
  'marketing',
  'marketer',
  'growth',
  'content',
  'brand',
  'social',
  'ambassador',
]

// People & HR => Enable People
const people = ['people', 'talent', 'hr', 'recruiter', 'recruitment']

// Operations & Customer Success
const operations = ['customer', 'support', 'client', 'operations', 'facilitator']

// Non-Tech, Finance, Legal
const nontech = ['finance', 'legal', 'compliance', 'corporate', 'office', 'administrative', 'counsel']

// Further Specialization for tagging
// ==
const backend = ['back-end', 'backend', 'back end']
const frontend = ['front-end', 'frontend', 'front end']
const fullstack = ['full-stack', 'fullstack', 'full stack']
const smartcontract = ['smart-contract', 'smart contract', 'solidity']
const devrel = ['developer advocate', 'developer evangelist', 'evangelist', 'developer relations', 'devrel']
const devops = ['dev-ops', 'devops', 'dev ops', 'automation', 'cloud', 'sre', 'reliability']
const qa = ['qa', 'quality assurance', 'quality', 'test']
const design = ['design', 'graphic', 'visual', 'creative']

export const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Business',
  'Marketing',
  'People',
  'Operations',
  'Non-Tech',
  'Other',
] as const
export type Department = typeof DEPARTMENTS[number]

export const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Volunteer', ''] as const
export type Type = typeof TYPES[number]

export const SKILLS = [
  'Back-end',
  'Front-end',
  'Full-stack',
  'Smart Contract',
  'DevRel',
  'DevOps',
  'QA',
  'Design',
  '',
] as const
export type Skill = typeof SKILLS[number]

export const TAGS = [...DEPARTMENTS, ...SKILLS] as const
export type Tag = typeof TAGS[number]

export const DEPARTMENTS_AS_COUNTS = DEPARTMENTS.map((i) => {
  return {
    key: i,
    count: 0,
  }
})

export function getJobDepartment(value: string): Department {
  if (engineering.some((i) => value.toLowerCase().includes(i))) {
    return 'Engineering'
  }

  if (product.some((i) => value.toLowerCase().includes(i))) {
    return 'Product'
  }

  if (business.some((i) => value.toLowerCase().includes(i))) {
    return 'Business'
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

export function getJobTags(value: string): Array<Tag> {
  const tags: Array<Tag> = []

  // DEPARTMENTS
  if (engineering.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Engineering')
  }

  if (product.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Product')
  }

  if (business.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Business')
  }

  if (marketing.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Marketing')
  }

  if (people.some((i) => value.toLowerCase().includes(i))) {
    tags.push('People')
  }

  if (operations.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Operations')
  }

  if (nontech.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Non-Tech')
  }

  // SKILLS
  if (backend.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Back-end')
  }
  if (frontend.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Front-end')
  }
  if (fullstack.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Full-stack')
  }
  if (smartcontract.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Smart Contract')
  }
  if (devrel.some((i) => value.toLowerCase().includes(i))) {
    tags.push('DevRel')
  }
  if (devops.some((i) => value.toLowerCase().includes(i))) {
    tags.push('DevOps')
  }
  if (qa.some((i) => value.toLowerCase().includes(i))) {
    tags.push('QA')
  }
  if (design.some((i) => value.toLowerCase().includes(i))) {
    tags.push('Design')
  }

  return tags
}

export function getApplicationUrl(url: string) {
  if (url.startsWith('mailto:')) {
    return url
  }

  return `${url}${url.includes('?') ? '&' : '?'}utm_source=useweb3.xyz&ref=useweb3.xyz`
}
