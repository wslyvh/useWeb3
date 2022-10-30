import moment from 'moment'
import fetch from 'cross-fetch'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { DAYS_JOBS_LISTED_DEFAULT, getJobDepartment, getJobTags, Type } from 'utils/jobs'

const map = new Map()

export class WorkableJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://www.workable.com/api/accounts/${orgId}?details=true`)
      const data = await res.json()

      return data.jobs
        .map((i: any) => {
          return {
            id: String(i.shortcode),
            slug: `${String(i.shortcode)}-${defaultSlugify(i.title)}`,
            title: i.title,
            department: getJobDepartment(i.title),
            description: removeHtml(i.description),
            body: i.description,
            contentType: 'html',
            location: i.country && i.city ? `${i.city}, ${i.country}` : '',
            remote: i.telecommuting ?? false,
            type: getJobType(i),
            org: org,
            url: i.url,
            tags: getJobTags(i.title),
            updated: new Date(i.published_on).getTime(),
          } as Job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(DAYS_JOBS_LISTED_DEFAULT, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('WorkableJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}

function getJobType(source: any): Type {
  if (!source.employment_type) return ''
  if (source.employment_type.toLowerCase().includes('full')) return 'Full-time'
  if (source.employment_type.toLowerCase().includes('part')) return 'Part-time'
  if (source.employment_type.toLowerCase().includes('contract')) return 'Contract'
  if (source.employment_type.toLowerCase().includes('intern')) return 'Internship'
  if (source.employment_type.toLowerCase().includes('volunteer')) return 'Volunteer'

  return ''
}

// EXAMPLE
// ==

// {
//   "title": "Local Ambassador",
//   "shortcode": "58CF28660D",
//   "code": "",
//   "employment_type": "Contract",
//   "telecommuting": true,
//   "department": "Marketing",
//   "url": "https://apply.workable.com/j/58CF28660D",
//   "shortlink": "https://apply.workable.com/j/58CF28660D",
//   "application_url": "https://apply.workable.com/j/58CF28660D/apply",
//   "published_on": "2021-06-10",
//   "created_at": "2021-06-10",
//   "country": "United States",
//   "city": "Miami",
//   "state": "Florida",
//   "education": "Bachelor's Degree",
//   "experience": "Associate",
//   "function": "Marketing",
//   "industry": "Information Technology and Services",
//   "description": "<h3> <strong>About DoinGud</strong><br> </h3><p>DoinGud is an NFT ecosystem focused on inspiring creativity and positive social impact.</p><p>We strive to be community-owned, governed, and curated, ensuring we empower our creators, curators, collectors, and communities to tap into sustainable income streams, creatively engage with their patrons, and create lasting impact for the causes they care about.</p><p><br></p><h3>About you and us</h3><p>We are here to inspire creativity and provide accessibility to this new digital medium. We bring together communities, foster positive impact, manifest opportunity, and remove barriers of entry to inspire creativity and fuel passions.</p><p>The DoinGud team is full of proactive creators and hands-on builders. We are currently in execution mode and are excited and committed to providing an innovative, feature-rich, and accessible ecosystem for our creators, partners, and collaborators.</p><p>Our team members embody our values and ethos, and we collaborate with individuals who are:</p><ul> <li>Autonomous</li> <li>Collaborative</li> <li>Patient</li> <li>Kind, Mindful, &amp; Ambitious</li> <li>Communicate Openly and Clearly</li> <li>Open to Learning, Teaching, and Sharing Knowledge</li> <li>Fast-Paced, Delivery-Oriented, and Participate in Do-ocracy</li> <li>English Speaking</li> </ul><p>In the rapidly evolving and exciting NFT space, we are seeking individuals who add unique flair, creative ideas, vibrant energy, and technical wizardry to our team. We view ourselves as more of a movement than a platform, and we are looking for like-minded professionals to join us on this journey.</p><p><br></p><h3><strong>About Local Ambassador Role</strong></h3><p>The DoinGud Ambassador program is a global program for local leaders to educate and empower local galleries, artists, and collectors. Your responsibilities would be to connect with local galleries, host local educational events in local galleries, share educational material in the native language, and collect community feedback. As a local ambassador, you represent DoinGud locally in your community and lead communication/feedback.</p><p><strong>Time Commitment:</strong> 10hrs per week </p><p><strong>Compensation:</strong> Commission based</p><p><strong>Requirements</strong></p><h3>You are:</h3><ul> <li>Based in Miami</li> <li>Art/NFT enthusiast</li> <li>Aware of the latest NFT news</li> <li>Confident public speaker</li> <li>Passionate about educating &amp; empowering artists</li> <li>Self-starter</li> <li>Excited about creating engaging conversations with your local community regarding NFT uses</li> <li>Good listener, able to collect feedback &amp; needs from the community</li> </ul><h3>Must-Have:</h3><ul> <li>Public speaking experience</li> <li>Fluent language skills in English &amp; native city/country language</li> <li>NFT Knowledge &amp; experience</li> <li>Prior community building experience</li> <li>Self-starter</li> </ul><h3>Nice to have:</h3><ul> <li>Local community leader</li> <li>Connected with local artist community</li> </ul><p><strong>Benefits</strong></p><h3>Why Join Us?</h3><ul> <li> <strong>Be part of a movement</strong>. We strive for bold changes and envision to make a big impact. Bring your passion, energy and creativity to participate.</li> <li> <strong>Learn and grow.</strong> You get to continuously learn and develop your skills.</li> <li> <strong>Be free</strong>. You have the freedom to set the time you are gonna work.</li> <li><strong>Do good.</strong></li> </ul>"
// },
