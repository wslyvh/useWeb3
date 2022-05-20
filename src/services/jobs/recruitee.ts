import moment from 'moment'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { getJobDepartment, getJobTags, Type } from 'utils/jobs'

const map = new Map()

export class RecruiteeJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://${orgId}.recruitee.com/api/offers/`)
      const data = await res.json()

      return data.offers
        .map((i: any) => {
          return {
            id: String(i.id),
            slug: `${String(i.id)}-${defaultSlugify(i.title)}`,
            title: i.title,
            department: getJobDepartment(i.title),
            description: removeHtml(i.description),
            body: i.description,
            contentType: 'html',
            location: i.location,
            remote: i.remote ?? false,
            type: getJobType(i),
            org: org,
            url: i.careers_url,
            tags: getJobTags(i.title),
            updated: new Date(i.published_at).getTime(),
          } as Job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('RecruiteeJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}

function getJobType(source: any): Type {
  if (source.max_hours < 40) return 'Part-time'
  if (source.min_hours === 40 || source.max_hours) return 'Full-time'

  return ''
}

// EXAMPLE
// ==

// {
//   "mailbox_email": "job.lsegf@giveth.recruitee.com",
//   "tags": [
//     "qa",
//     "quality assurance"
//   ],
//   "options_photo": "off",
//   "experience_code": "mid_level",
//   "created_at": "2022-05-16 12:57:39 UTC",
//   "postal_code": null,
//   "city": "Barcelona",
//   "close_at": null,
//   "id": 974548,
//   "options_cover_letter": "off",
//   "max_hours": 45,
//   "department": "Tech",
//   "education_code": "professional",
//   "location": "Remote job",
//   "state_code": "CT",
//   "slug": "giveth-qa-specialist",
//   "min_hours": 40,
//   "options_phone": "off",
//   "options_cv": "required",
//   "position": 27,
//   "open_questions": [
//     {
//       "body": "What's your experience in QA similar to this role?",
//       "id": 1334539,
//       "kind": "text",
//       "open_question_options": [],
//       "position": 1,
//       "required": true,
//       "translations": {
//         "en": {
//           "body": "What's your experience in QA similar to this role?"
//         }
//       }
//     },
//     {
//       "body": "What do you think is a unique aspect of web3 / crypto projects related to this role?",
//       "id": 1334544,
//       "kind": "text",
//       "open_question_options": [],
//       "position": 2,
//       "required": true,
//       "translations": {
//         "en": {
//           "body": "What do you think is a unique aspect of web3 / crypto projects related to this role?"
//         }
//       }
//     },
//     {
//       "body": "We’re looking for people that believe in our mission! Have a look at the Giveth website (https://giveth.io) and let us know what excites you about what we’re building *",
//       "id": 1334540,
//       "kind": "text",
//       "open_question_options": [],
//       "position": 3,
//       "required": true,
//       "translations": {
//         "en": {
//           "body": "We’re looking for people that believe in our mission! Have a look at the Giveth website (https://giveth.io) and let us know what excites you about what we’re building *"
//         }
//       }
//     },
//     {
//       "body": "Please add your LinkedIn profile (or any public place where we can learn more about you)",
//       "id": 1334542,
//       "kind": "string",
//       "open_question_options": [],
//       "position": 4,
//       "required": false,
//       "translations": {
//         "en": {
//           "body": "Please add your LinkedIn profile (or any public place where we can learn more about you)"
//         }
//       }
//     },
//     {
//       "body": "Do you know anyone that works at Giveth, General Magic of the Commons Stack? If so, who?",
//       "id": 1334543,
//       "kind": "string",
//       "open_question_options": [],
//       "position": 5,
//       "required": false,
//       "translations": {
//         "en": {
//           "body": "Do you know anyone that works at Giveth, General Magic of the Commons Stack? If so, who?"
//         }
//       }
//     }
//   ],
//   "country": "Spain",
//   "translations": {
//     "en": {
//       "description": "<p dir=\"ltr\"><em><strong>Who are we at Giveth?</strong></em></p>\n<p dir=\"ltr\"><a href=\"https://giveth.io/\" target=\"_blank\" rel=\"noopener\">Giveth</a> is a community focused on Building the Future of Giving using blockchain technology. Our intention is to support and reward the funding of public goods by creating open, transparent and free access to the revolutionary funding opportunities available within the Ethereum ecosystem. Our mission is to build a culture of giving that rewards and empowers those who give - to projects, to society, and to the world.<br /></p>\n<p dir=\"ltr\"><br /></p>\n<p dir=\"ltr\"><em><strong>Who are we looking for?</strong></em></p>\n<p dir=\"ltr\">Giveth is looking for an experienced QA Specialist working in blockchain and Web3 concepts, to serve as a liaison between the project managers and development teams. The finest candidate has innovative ideas and effective communication skills to increase value, efficiency, and quality in our organization.</p>\n<p dir=\"ltr\"></p>\n<p dir=\"ltr\"><strong>Job Responsibilities</strong></p>\n<p dir=\"ltr\"> </p>\n<ul><li dir=\"ltr\"><p dir=\"ltr\">Design and develop test automation frameworks.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Develop testing strategy, plans, estimates, and schedule, to support projects and product releases.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Design, create and maintain testing framework(s) as needed</p></li><li dir=\"ltr\"><p dir=\"ltr\">Execute end to end front end testing and backend load testing</p></li><li dir=\"ltr\"><p dir=\"ltr\">Identify, record and track bugs, monitor debugging process results.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Help the team understand test concepts and adopt unique tools for implementing test scenarios.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Provide and monitor product QA metrics that are beneficial to the project.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Create and execute basic user testing scenarios and guidelines.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Maintaining test scenarios and user testing.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Utilize coding standards.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Participate in the QA process standardization and improvement efforts.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Participation in the creation and implementation of the QA maturity.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Drive and oversee both functional and non-functional testing.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Adhere to development processes and workflows.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Create design and user documentation as needed.</p></li></ul>",
//       "requirements": "<p dir=\"ltr\"><strong>Qualifications</strong><br /></p>\n<ul><li dir=\"ltr\"><p dir=\"ltr\">4+ years of proven experience in software QA Automation and UAT. </p></li><li dir=\"ltr\"><p dir=\"ltr\">Experience working in blockchain is highly preferred.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Skilled in writing test plans, test automation, or test cases.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Skilled in keeping test scenarios updated and documented. </p></li><li dir=\"ltr\"><p dir=\"ltr\">Familiar with Agile Scrum software development cycles. </p></li><li dir=\"ltr\"><p dir=\"ltr\">Familiar with task and documentation management tools (Preferably ZenHub)</p></li><li dir=\"ltr\"><p dir=\"ltr\">Teaching and mentoring skill is a plus. </p></li><li dir=\"ltr\"><p dir=\"ltr\">You are passionate about helping teams continuously improve by challenging their practices, and/or by facilitating sessions for them</p></li></ul>\n<p dir=\"ltr\"> </p>\n<p dir=\"ltr\"><em><strong>Payment and Perks</strong></em> </p>\n\n<ul><li dir=\"ltr\"><p dir=\"ltr\">We pay in the DAI a stable coin, so no need to worry about work permits.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Freedom of a flexible work schedule.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Work in the remote location of your choice; ideally between Europe, North America, and South America.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Additional compensation package of tokens (be an owner of what you help create).</p></li><li dir=\"ltr\"><p dir=\"ltr\">Flexible vacation time.</p></li></ul>",
//       "title": "Giveth - QA Specialist"
//     }
//   },
//   "remote": true,
//   "careers_apply_url": "https://giveth.recruitee.com/o/giveth-qa-specialist/c/new",
//   "title": "Giveth - QA Specialist",
//   "employment_type_code": "fulltime",
//   "category_code": "internet",
//   "description": "<p dir=\"ltr\"><em><strong>Who are we at Giveth?</strong></em></p>\n<p dir=\"ltr\"><a href=\"https://giveth.io/\" target=\"_blank\" rel=\"noopener\">Giveth</a> is a community focused on Building the Future of Giving using blockchain technology. Our intention is to support and reward the funding of public goods by creating open, transparent and free access to the revolutionary funding opportunities available within the Ethereum ecosystem. Our mission is to build a culture of giving that rewards and empowers those who give - to projects, to society, and to the world.<br /></p>\n<p dir=\"ltr\"><br /></p>\n<p dir=\"ltr\"><em><strong>Who are we looking for?</strong></em></p>\n<p dir=\"ltr\">Giveth is looking for an experienced QA Specialist working in blockchain and Web3 concepts, to serve as a liaison between the project managers and development teams. The finest candidate has innovative ideas and effective communication skills to increase value, efficiency, and quality in our organization.</p>\n<p dir=\"ltr\"></p>\n<p dir=\"ltr\"><strong>Job Responsibilities</strong></p>\n<p dir=\"ltr\"> </p>\n<ul><li dir=\"ltr\"><p dir=\"ltr\">Design and develop test automation frameworks.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Develop testing strategy, plans, estimates, and schedule, to support projects and product releases.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Design, create and maintain testing framework(s) as needed</p></li><li dir=\"ltr\"><p dir=\"ltr\">Execute end to end front end testing and backend load testing</p></li><li dir=\"ltr\"><p dir=\"ltr\">Identify, record and track bugs, monitor debugging process results.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Help the team understand test concepts and adopt unique tools for implementing test scenarios.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Provide and monitor product QA metrics that are beneficial to the project.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Create and execute basic user testing scenarios and guidelines.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Maintaining test scenarios and user testing.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Utilize coding standards.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Participate in the QA process standardization and improvement efforts.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Participation in the creation and implementation of the QA maturity.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Drive and oversee both functional and non-functional testing.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Adhere to development processes and workflows.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Create design and user documentation as needed.</p></li></ul>",
//   "company_name": "Giveth",
//   "published_at": "2022-05-16 13:02:55 UTC",
//   "careers_url": "https://giveth.recruitee.com/o/giveth-qa-specialist",
//   "requirements": "<p dir=\"ltr\"><strong>Qualifications</strong><br /></p>\n<ul><li dir=\"ltr\"><p dir=\"ltr\">4+ years of proven experience in software QA Automation and UAT. </p></li><li dir=\"ltr\"><p dir=\"ltr\">Experience working in blockchain is highly preferred.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Skilled in writing test plans, test automation, or test cases.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Skilled in keeping test scenarios updated and documented. </p></li><li dir=\"ltr\"><p dir=\"ltr\">Familiar with Agile Scrum software development cycles. </p></li><li dir=\"ltr\"><p dir=\"ltr\">Familiar with task and documentation management tools (Preferably ZenHub)</p></li><li dir=\"ltr\"><p dir=\"ltr\">Teaching and mentoring skill is a plus. </p></li><li dir=\"ltr\"><p dir=\"ltr\">You are passionate about helping teams continuously improve by challenging their practices, and/or by facilitating sessions for them</p></li></ul>\n<p dir=\"ltr\"> </p>\n<p dir=\"ltr\"><em><strong>Payment and Perks</strong></em> </p>\n\n<ul><li dir=\"ltr\"><p dir=\"ltr\">We pay in the DAI a stable coin, so no need to worry about work permits.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Freedom of a flexible work schedule.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Work in the remote location of your choice; ideally between Europe, North America, and South America.</p></li><li dir=\"ltr\"><p dir=\"ltr\">Additional compensation package of tokens (be an owner of what you help create).</p></li><li dir=\"ltr\"><p dir=\"ltr\">Flexible vacation time.</p></li></ul>",
//   "country_code": "ES",
//   "status": "published"
// }
