const SELECTORS = {
  JOBS_COUNT: 'a[aria-label="Jobs"] > data',
  JOBS_LIST: '[class^="styles_jobList__"]',
  JOB_LIST_JOB: '[class^="styles_jobList__"] > div',
  JOBS_LINK: 'a[href="/company/gitcoin/jobs"]',
  JOB_TITLE: '[class^="styles_title__"] > div > h2',
  JOB_DESCRIPTION: '[class^="styles_description__"]',
  JOB_CHARACTERISTICS: '[class^="styles_characteristic__"] > dd',
  JOB_SALARY: '[class^="styles_subheader__"]',
  JOB_PUBLISHED_ON:
    '[class^="styles_headerRight__"] span[class^="styles_desktop__"]',
  COMPANY_TITLE: '[class^="styles_name__"] h1',
  COMPANY_DESCRIPTION: '[class^="styles_description__"]',
} as const;

const BASE_URL = "https://angel.co";

export { SELECTORS, BASE_URL }
