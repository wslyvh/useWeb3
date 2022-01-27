import { subDays } from "date-fns";
import { promises as fs } from "fs";
import { setTimeout } from "timers/promises";
import { getJobsList, getCompanyDetails, setAgent, scrapManyJobDetails } from "./jobs"
import { CompanyDetails, JobDetails } from "./types";
import { BASE_URL } from "./const";
import { JOBS_ANGEL, JOBS_FILTER } from "../../src/utils/constants"

const filePath = '../data/jobs.json'

const main = async () => {
  (await import("dotenv")).default.config()

  const getFilteredJobUrisAndDates = (jobUris: Array<string>, jobPostedDates: Array<Date>, company: string) =>
    jobUris.reduce<Array<{ jobUri: string; jobPostedDate: Date }>>((acc, uri, i) => {
      const jobId = uri.match(/\/company\/.*\/jobs\/([0-9]+.*)/)[1]
      const isScrapped = globalThis.jobsJson?.[company]?.jobs?.[jobId]

      if (isScrapped) {
        console.log(uri, " is already scrapped.")
        return acc;
      }

      const matchesFilter = JOBS_FILTER.some((f) => uri.toLowerCase().includes(f))
      const matchesDateFilter = jobPostedDates[i] >= subDays(new Date(Date.now()), 30)

      if (matchesFilter && matchesDateFilter) {
        acc.push({ jobUri: uri, jobPostedDate: jobPostedDates[i] });
      }

      return acc
    }, [])

  globalThis.jobsJson = JSON.parse((await fs.readFile(filePath)) as unknown as string) as Record<string, CompanyDetails | JobDetails>
  globalThis.jobsToWrite = {};

  console.log("Companies to scrap: ", JOBS_ANGEL.length)

  for (let i = 0; i < JOBS_ANGEL.length; i++) {
    const company = JOBS_ANGEL[i];
    console.log("Company: ", company);

    const page = `${BASE_URL}/${company}/jobs`;

    // Variables to be passed down to helpers and mutated
    let pagination = { length: 0 };
    let extraInfo = {
      name: "",
      content: "",
    };

    await setTimeout(5000);
    if (!globalThis.agent) {
      await setAgent();
    }

    if (!globalThis.jobsJson?.[company]?.name) {
      await getCompanyDetails(company, extraInfo, globalThis.agent);
      globalThis.jobsToWrite[company] = {
        name: extraInfo.name,
        content: extraInfo.content,
      }
    } else {
      console.log("Company details already scrapped. Skipping...");
    }
    const [jobUris, jobPostedDates] = await getJobsList(
      page,
      globalThis.agent,
      pagination,
      company
    );

    const filteredJobUrisWithDate = getFilteredJobUrisAndDates(
      jobUris,
      jobPostedDates,
      company
    );

    console.log(filteredJobUrisWithDate.length, " jobs to scrap for ", company);

    await scrapManyJobDetails(
      filteredJobUrisWithDate,
      company,
      globalThis.agent
    );

    if (Object.keys(globalThis.jobsToWrite).length) {
      await fs.writeFile(filePath, JSON.stringify(globalThis.jobsToWrite, null, 4))
      console.log("Jobs overwritten in jobs.json");
    }

    if (pagination.length) {
      for (let i = 2; i <= pagination.length; i++) {
        const pageToVisit = `${page}?page=${i}`;

        console.log("Visiting page ", i.toString(), " out of ", pagination.length)
        const [jobUris, jobPostedDates] = await getJobsList(pageToVisit, globalThis.agent, pagination)
        const filteredJobUrisWithDate = getFilteredJobUrisAndDates(jobUris, jobPostedDates, company)

        console.log(filteredJobUrisWithDate.length, "job(s) to scrap on page", i, "for", company)
        await scrapManyJobDetails(filteredJobUrisWithDate, company, globalThis.agent)

        if (Object.keys(globalThis.jobsToWrite).length) {
          await fs.writeFile(filePath, JSON.stringify(globalThis.jobsToWrite, null, 4))
          console.log("Jobs updated in jobs.json")
        }
      }
    }
  }
}

main();
