import { subDays } from "date-fns";
import { promises as fs } from "fs";
import { setTimeout } from "timers/promises";
import { getJobsList, getCompanyDetails, setAgent, scrapManyJobDetails } from "./jobs"
import { CompanyDetails, JobDetails } from "./types";
import { BASE_URL } from "./const";
import { JOBS_ANGEL, JOBS_FILTER } from "../../../src/utils/constants"

const filePath = '../../data/jobs.json'

const main = async () => {
  console.log('Start Ariel job..', new Date())
}

main();
