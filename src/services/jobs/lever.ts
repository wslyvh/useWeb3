import moment from 'moment'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify } from 'utils/helpers'
import { getJobDepartment, getJobTags } from 'utils/jobs'

const map = new Map()

export class LeverJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://api.lever.co/v0/postings/${orgId}?mode=json`)
      const data = await res.json()
      if (!data) return []

      return data
        .map((i: any) => {
          return {
            id: i.id,
            slug: `${String(i.id)}-${defaultSlugify(i.text)}`,
            title: i.text,
            department: getJobDepartment(i.text),
            description: i.descriptionPlain,
            body: i.description,
            contentType: 'html',
            location: i.categories?.location,
            remote: i.categories?.location.toLowerCase().includes('remote') ?? false,
            org: org,
            url: i.applyUrl,
            tags: getJobTags(i.text),
            updated: new Date(i.createdAt).getTime(),
          } as Job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('LeverJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}

// [{
// 	"additionalPlain": "Please submit a cover letter along with your resume explaining your qualifications. \n",
// 	"additional": "<div><span style=\"font-size: 15px\">Please submit a cover letter along with your resume explaining your qualifications.&nbsp;</span></div>",
// 	"categories": {
// 		"department": "Ethereum Foundation",
// 		"location": "Remote",
// 		"team": "Finance"
// 	},
// 	"createdAt": 1648778502777,
// 	"descriptionPlain": "About the Ethereum Foundation:\nThe Ethereum Foundation (EF) is a global non-profit organization dedicated to advancing the Ethereum protocol and ecosystem. Since its launch in 2015, Ethereum has become the most active public blockchain network. Today, Ethereum hosts thousands of applications in a variety of fields like finance, gaming, social media, and enterprise solutions, and the list is growing at a remarkable pace. To ensure the continued growth of Ethereum, the Ethereum Foundation is actively identifying and filling gaps, both in improving the core technology and in enriching the Ethereum community.\n\nYour Mission:\nYour mission will be assisting the finance team at the Ethereum Foundation with all things related to finance and accounting. \n\n",
// 	"description": "<div><b style=\"font-size: 15px\">About the Ethereum Foundation:</b></div><div><span style=\"font-size: 15px\">The Ethereum Foundation (EF) is a global non-profit organization dedicated to advancing the Ethereum protocol and ecosystem. Since its launch in 2015, Ethereum has become the most active public blockchain network. Today, Ethereum hosts thousands of applications in a variety of fields like finance, gaming, social media, and enterprise solutions, and the list is growing at a remarkable pace. To ensure the continued growth of Ethereum, the Ethereum Foundation is actively identifying and filling gaps, both in improving the core technology and in enriching the Ethereum community.</span></div><div><br></div><div><b style=\"font-size: 15px\">Your Mission:</b></div><div><span style=\"font-size: 15px\">Your mission will be assisting the finance team at the Ethereum Foundation with all things related to finance and accounting.&nbsp;</span></div><div><br></div>",
// 	"id": "f99af9ae-e87c-4487-9c3f-efec82131241",
// 	"lists": [{
// 		"text": "Core responsibilities",
// 		"content": "<li>Run AP reports and track payments</li><li>Invoice collection and uploading to the platform</li><li>Inform vendors when payments have been made</li><li>Maintain various reports to stakeholders</li><li>Maintain and update data on multiple platforms</li>"
// 	}, {
// 		"text": "About you:",
// 		"content": "<li>Diploma and/or bachelor’s degree in accounting/finance&nbsp;</li><li>Fresh graduates are welcome to apply</li><li>Familiar with Google Spreadsheet/Microsoft Excel</li><li>Proficient in English, speaking, and writing</li><li>Have a valid passport and be able to travel</li><li>Willing to work flexible hours</li>"
// 	}, {
// 		"text": "Bonus Skills:",
// 		"content": "<li>Cross-cultural expertise, experience in working with international teams across various time zones</li><li>You take self-responsibility and initiative and possess a can-do attitude</li><li>Experience with Google Data Studio is a plus but not required</li><div><br></div>"
// 	}, {
// 		"text": "Employment Details:",
// 		"content": "<li>This is a remote position, you will be working in different time zones (mostly Asian and European)</li><li><b>Preferably located in Europe</b></li><li>Begin with 20 hours per week and may evolve into a full-time position after 3 to 6 months</li><li>Work directly with the head of finance</li><li>Opportunity to work in a flexible, young environment with open-minded people</li>"
// 	}],
// 	"text": "Administrative Assistant",
// 	"hostedUrl": "https://jobs.lever.co/ethereumfoundation/f99af9ae-e87c-4487-9c3f-efec82131241",
// 	"applyUrl": "https://jobs.lever.co/ethereumfoundation/f99af9ae-e87c-4487-9c3f-efec82131241/apply"
// }]
