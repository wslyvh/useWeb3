import { promises as fs } from "fs";
import { Agent } from "secret-agent";
import { setTimeout } from "timers/promises";
import bluebird from "bluebird";
import { getCompensationDetails, getDateFromDistance } from "./utils";
import { BASE_URL, SELECTORS } from "./const";

const setAgent = async () => {
  console.log("Configuring secret-agent with user profile...");
  const userProfile = JSON.parse(await fs.readFile("profile.json", "utf-8"));

  userProfile.cookies[0].value = process.env.DATADOME_COOKIE;

  globalThis.agent = await new Agent({
    userProfile,
    showReplay: false,
  });
  return;
};

const getCompanyDetails = async (
  company: string,
  extraInfo: Record<string, string>,
  agent: Agent
) => {
  await agent.goto(`${BASE_URL}/company/${company}`);
  await agent.waitForElement(
    agent.document.querySelector(
      `${SELECTORS.COMPANY_TITLE} a[href="/company/${company}"]`
    )
  );
  const title = await agent.document.querySelector(
    `${SELECTORS.COMPANY_TITLE} a[href="/company/${company}"]`
  ).innerText;

  const contentRaw = agent.document.querySelector(
    SELECTORS.COMPANY_DESCRIPTION
  );

  let content;
  try {
    content = await contentRaw?.innerHTML;
  } catch (e) {
    // This throws at no company description div found
    // There is no way to know that the element does not exist, until we try to access its innerHTML
    content = "";
  }
  extraInfo.name = title;
  extraInfo.content = content || "";
};

const getJobsList = async (
  page: string,
  agent: Agent,
  pagination: { length: number },
  company?: string
) => {
  try {
    await agent.goto(page);
    await agent.waitForElement(
      agent.document.querySelector(SELECTORS.JOB_LIST_JOB)
    );
  } catch (e) {
    console.log(`
    Could not find jobs list after timeout.
    This usually means the profile got invalidated because of e.g rate-limiting, or is too old.
    Run yarn regnerate-profile and solve captcha to save it.
    `);
    process.exit(0);
  }
  let jobUris = [];
  let jobPostedDates = [];
  const jobDivs = agent.document.querySelectorAll(SELECTORS.JOB_LIST_JOB);

  await jobDivs.forEach(async (jobDiv) => {
    const href = await jobDiv
      .querySelector("a:nth-child(1)")
      .getAttribute("href");

    await agent.waitForElement(
      agent.document.querySelector(SELECTORS.JOB_PUBLISHED_ON)
    );
    const publishedOnRaw = await agent.document
      .querySelector(`a[href="${href}"]`)
      .parentElement.querySelector(SELECTORS.JOB_PUBLISHED_ON).innerText;

    const publishedOn = getDateFromDistance(publishedOnRaw);
    jobUris.push(href);
    jobPostedDates.push(publishedOn);
  });

  // Get number of pages and mutate pagination var with length if applicable
  const paginationLength =
    (await agent.document.querySelectorAll(
      "nav[aria-label='Pagination Navigation'] > ul li"
    ).length) - 2;
  const jobsCount = await agent.document.querySelector(SELECTORS.JOBS_COUNT)
    .innerHTML;
  if (
    parseInt(jobsCount) ===
    Object.keys(globalThis.jobsJson?.[company] || {}).length
  ) {
    console.log(
      "No new jobs posted since last scrap. Skipping visit of next pages"
    );
    pagination.length = -1;
  } else if (paginationLength && pagination && !pagination.length) {
    pagination.length = paginationLength;
  }

  return [jobUris, jobPostedDates];
};

// Sequentially scraps many job URIS for a company
const scrapManyJobDetails = async (
  filteredJobUrisWithDate: Array<{ jobUri: string; jobPostedDate: Date }>,
  company: string,
  agent
) =>
  bluebird.each(filteredJobUrisWithDate, async (jobUriWithDate, i) => {
    console.log("Fetching... ", jobUriWithDate.jobUri);
    await setTimeout(5000);

    const jobUrl = `${BASE_URL}${jobUriWithDate.jobUri}`;
    const jobId = jobUriWithDate.jobUri.match(
      /\/company\/.*\/jobs\/([0-9]+.*)/
    )[1];

    await agent.goto(jobUrl);
    await agent.waitForMillis(5000);

    // Get available metadata from DOM
    await agent.waitForElement(
      agent.document.querySelector(SELECTORS.JOB_TITLE)
    );
    await agent.waitForElement(
      agent.document.querySelector(SELECTORS.JOB_DESCRIPTION)
    );
    const descriptionNode = await agent.document.querySelector(
      SELECTORS.JOB_DESCRIPTION
    );
    const description = (await descriptionNode?.innerHTML) ?? "";
    const salary =
      (await (
        await agent.document.querySelector(SELECTORS.JOB_SALARY)
      )?.innerText) || "";

    const id = jobId;

    const title = await (
      await agent.document.querySelector(SELECTORS.JOB_TITLE)
    ).innerText;

    const [locationNode] = await agent.document.querySelectorAll(
      SELECTORS.JOB_CHARACTERISTICS
    );

    const location = (await locationNode?.innerText) || "";

    const { min, max, currency, equity } = getCompensationDetails(salary);

    globalThis.jobsToWrite = {
      ...globalThis.jobsJson,
      ...globalThis.jobsToWrite,
      [company]: {
        ...globalThis.jobsJson?.[company],
        ...globalThis.jobsToWrite?.[company],
        jobs: {
          ...globalThis.jobsJson?.[company]?.jobs,
          ...globalThis.jobsToWrite?.[company]?.jobs,
          [jobId]: {
            url: jobUrl,
            id,
            published_on: jobUriWithDate.jobPostedDate,
            title,
            description,
            location,
            salary: {
              min,
              max,
              currency,
              equity,
            },
          },
        },
      },
    };
  });

export { getJobsList, getCompanyDetails, setAgent, scrapManyJobDetails };
