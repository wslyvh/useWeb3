import moment from 'moment'
import fetch from 'cross-fetch'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { DAYS_JOBS_LISTED_DEFAULT, getJobDepartment, getJobTags, Type } from 'utils/jobs'

const map = new Map()

export class WrkJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://hire.wrk.xyz/api/v1/public/organizations/${orgId}/jobs/`)
      const data = await res.json()

      if (!data.items || data.items.length === 0) return []

      const jobs = await Promise.all(
        data.items?.map(async (i: any) => {
          const response = await fetch(`https://hire.wrk.xyz/api/v1/public/organizations/${orgId}/jobs/${i.id}`)
          const job = await response.json()

          return {
            id: String(job.id),
            slug: `${String(job.id)}-${defaultSlugify(job.title)}`,
            title: job.title,
            department: getJobDepartment(job.title),
            description: removeHtml(job.description),
            body: job.description,
            contentType: 'html',
            location: job.remoteness_pretty ?? job.display_location,
            remote: job.remoteness_pretty?.toLowerCase().includes('remote') ?? false,
            type: getJobType(job),
            org: org,
            url: job.job_post_url,
            tags: getJobTags(job.title),
            updated: new Date(job.published_at).getTime(),
          } as Job
        }) as Array<Job>
      )

      return jobs
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(DAYS_JOBS_LISTED_DEFAULT, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('WrkJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}

function getJobType(source: any): Type {
  if (!source.kind_pretty) return ''
  if (source.kind_pretty.toLowerCase().includes('full')) return 'Full-time'
  if (source.kind_pretty.toLowerCase().includes('part')) return 'Part-time'
  if (source.kind_pretty.toLowerCase().includes('contract')) return 'Contract'
  if (source.kind_pretty.toLowerCase().includes('intern')) return 'Internship'
  if (source.kind_pretty.toLowerCase().includes('volunteer')) return 'Volunteer'

  return ''
}

// EXAMPLE
// ==

// {
//   id: 19841,
//   job_id: 19841,
//   hash_id: 'ukouathpkw8q',
//   title: 'Senior Software Engineer',
//   description: "<p><strong>Senior Software Engineer</strong></p><p><strong>About the Role:</strong><br>Filebase is seeking an experienced senior-level Software Engineer with solid experience developing high-performance APIs. This is an early key hire and you will be working alongside our founding team to further build out our S3 compatible storage API and associated data models.</p><p>The work you do will be used by hundreds of thousands of people and as such, the code you write is important. You will be required to understand production front-ends including how to contribute to S3 Compatible API clients (Java, Ruby, Go).</p><p>A willingness to learn and experiment with new tech is much more important than hands-on experience with our current stack. We are solving complex challenges to quickly scale our infrastructure 10x, 100x, or even more to meet the rapid growth of the company and our customers' data needs. We want thoughtful, collaborative engineers who are comfortable adapting to new technology and new opportunities.</p><p>We are looking for team members who have the grit to dig deeper, understand problems, and deliver innovative solutions, in a distributed and highly competitive market.</p><p><strong>Our software stack</strong> - consists of Ruby on Rails, Go, Javascript, and Lua.<br></p><p><strong>We want someone who can:</strong></p><ul>\n" +
//     '<li><p>Maintain and improve the architecture of our S3 compatible storage API.</p></li>\n' +
//     '<li><p>Work to build efficient data models using database technologies that support billions of rows.</p></li>\n' +
//     '<li><p>Debug and troubleshoot live production issues using cutting edge tools, including Elasticsearch and DataDog.</p></li>\n' +
//     '<li><p>Work closely with developers to find ways to automate and improve existing processes.</p></li>\n' +
//     '<li><p>Help to design and maintain large scale data processing systems<br></p></li>\n' +
//     '</ul><p><strong>Does this sound like you?:</strong></p><ul>\n' +
//     '<li><p>5+ years of development experience with Ruby on Rails and Javascript (frontend)</p></li>\n' +
//     '<li><p>5+ years of experience with relational and NoSQL databases, such as MySQL, Cassandra, DynamoDB, and ScyllaDB.</p></li>\n' +
//     '<li><p>5+ years of experience with Linux systems</p></li>\n' +
//     '<li><p>Hands-on experience with Redis, Docker, Terraform, and Kubernetes is a big plus</p></li>\n' +
//     '<li><p>Have architected, built and deployed scalable, performant web services in production on AWS or hyperscale providers</p></li>\n' +
//     '<li><p>Passion for solving challenging problems and iterating quickly</p></li>\n' +
//     '</ul><p>The ideal candidate will also have hands-on experience with usage of AWS S3 and data modeling using relational and NoSQL databases, such as MySQL, Cassandra, DynamoDB, and ScyllaDB. We employ modern monitoring and alerting tools to observe our services, and make sure the problem can be escalated to the on-call team, or corrected automatically.</p><p>Extensive knowledge of the AWS S3 API is not required, but is considered a huge plus.<br></p><p><strong>What we offer:</strong></p><ul>\n' +
//     '<li><p>Competitive salary and equity</p></li>\n' +
//     '<li><p>Heavily subsidized benefits: Medical, dental and vision insurance for employees and dependents.</p></li>\n' +
//     '<li><p>401k w/ employer match</p></li>\n' +
//     '<li><p>Unlimited PTO and Flexible working hours</p></li>\n' +
//     '<li><p>Remote-first Culture,</p></li>\n' +
//     '<li><p>Opportunities to attend industry conferences (when in-person events come back!)</p></li>\n' +
//     '<li><p>High output, creative and passionate teammates</p></li>\n' +
//     '<li><p>Missing something appealing here? Please let us know!<br></p></li>\n' +
//     '</ul><p><strong>About Filebase</strong></p><p>Filebase is the world’s first object storage platform powered by decentralized storage networks. We unify multiple networks under a single S3-compatible API to make decentralized storage accessible and easy to use. Our edge-caching technology achieves industry-leading performance when writing and fetching data to and from decentralized networks, making them a highly-secure, geo-redundant alternative to traditional cloud storage at a fraction of the costs.</p><p>Filebase was awarded the <a href="https://noonies.tech/award/most-exciting-data-storage-and-sharing-project" target="_blank" rel="nofollow"><strong><span>“Most Exciting Data Storage And Sharing Project”</span></strong></a> in HackerNoon’s 2020 Noonies Awards and was a finalist in <a href="https://searchstorage.techtarget.com/feature/Enterprise-data-storage-2019-Products-of-the-Year-finalists" target="_blank" rel="nofollow"><strong><span>Storage Magazine’s 2019 Product of the Year Awards</span></strong></a>.<br><br><em><strong>To learn more about Filebase,</strong></em><strong> </strong>please visit <a href="https://filebase.com/" target="_blank" rel="nofollow"><strong><span>https://filebase.com/</span></strong></a></p>',
//   department: null,
//   country: 'US',
//   state_region: null,
//   city: null,
//   organization_name: 'Filebase',
//   kind: 'full_time',
//   kind_pretty: 'Full-time',
//   created_at: '2021-04-05T20:25:05.707Z',
//   published_at: '2021-04-06T15:11:57.013Z',
//   archived_at: null,
//   display_location: 'US',
//   settings: {
//     name: 'required',
//     email: 'required',
//     phone: 'optional',
//     resume: 'required',
//     location: 'optional',
//     github_url: 'hidden',
//     twitter_url: 'hidden',
//     website_url: 'optional',
//     cover_letter: 'optional',
//     dribbble_url: 'hidden',
//     linkedin_url: 'optional',
//     social_share_image_type: 'custom'
//   },
//   created_at_timestamp: 1617654305,
//   published_at_timestamp: 1617721917,
//   job_post_url: 'https://jobs.filebase.com/19841',
//   job_application_description_url: 'https://jobs.filebase.com/19841',
//   remoteness_pretty: 'Remote',
//   job_category_name: 'Engineering',
//   remote_restriction_country_residency_is_required: false,
//   remote_restriction_country_list: [],
//   remote_restriction_overlap_hours_is_required: false,
//   remote_restriction_overlap_hours: null,
//   remote_restriction_city: null,
//   remote_restriction_city_google_place_id: null,
//   remote_restriction_timezone_utc_offset_seconds: null,
//   questions: [
//     {
//       id: 1727,
//       question_id: 1727,
//       job_id: 19841,
//       question_text: 'How many years experience do you have with Ruby on Rails?',
//       placeholder_text: null,
//       requirement_setting: 'required',
//       kind: 'single_select',
//       position: 1,
//       options: [Object]
//     },
//     {
//       id: 1728,
//       question_id: 1728,
//       job_id: 19841,
//       question_text: 'How many years experience do you have with Javascript (frontend) ?',
//       placeholder_text: null,
//       requirement_setting: 'required',
//       kind: 'single_select',
//       position: 2,
//       options: [Object]
//     },
//     {
//       id: 1729,
//       question_id: 1729,
//       job_id: 19841,
//       question_text: 'Which databases do you have experience with? ',
//       placeholder_text: null,
//       requirement_setting: 'required',
//       kind: 'single_select',
//       position: 3,
//       options: [Object]
//     },
//     {
//       id: 1730,
//       question_id: 1730,
//       job_id: 19841,
//       question_text: 'Share your github',
//       placeholder_text: null,
//       requirement_setting: 'optional',
//       kind: 'text_short',
//       position: 4,
//       options: [Object]
//     }
//   ]
// }
