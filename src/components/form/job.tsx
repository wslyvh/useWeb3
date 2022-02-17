import { Dropdown } from 'components/dropdown'
import { Job } from 'types/job'
import { DEPARTMENTS } from 'utils/jobs'
import styles from './forms.module.scss'
import { FormInput } from './input'

interface Props {
  job: Job
  onChange: (value: Job) => void
  className?: string
}

export function JobForm(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <h2>Step 2: Job Details</h2>
      <p className="muted">
        Please keep in mind that all the information shared here will be part of the public job opening.
      </p>

      <div className={styles.form}>
        <FormInput
          id="title"
          name="Position"
          info="E.g. Blockchain Engineer, Product Manager, UI/UX Designer, etc."
          placeholder="Solidity Engineer"
          value={props.job.title}
          onChange={(value) => props.onChange({ ...props.job, title: value })}
          required
        />

        <div className={styles.group}>
          <label className={styles.header} htmlFor="department">
            Category
          </label>
          <span className={styles.info}>Which category fits best with the role</span>

          <div>
            <Dropdown
              className={styles.dropdown}
              items={DEPARTMENTS}
              onSelect={(value) => props.onChange({ ...props.job, department: value as any })}
            />
          </div>
        </div>

        <FormInput
          id="description"
          name="Short description"
          info="Describe in short what this role is about (max. 120 chars)"
          value={props.job.description}
          onChange={(value) => props.onChange({ ...props.job, description: value })}
          required
        />

        <FormInput
          id="body"
          type="textarea"
          name="Job description"
          info="Full description of the role, expectations, skills, etc. (supports markdown)"
          value={props.job.body}
          onChange={(value) => props.onChange({ ...props.job, body: value })}
          required
        />

        <div className={styles.group}>
          <label className={styles.header} htmlFor="remote">
            Remote
          </label>
          <span className={styles.info}>Is this a fully remote position?</span>

          <div>
            <input
              type="checkbox"
              checked={props.job.remote}
              onChange={(e) =>
                props.onChange({ ...props.job, remote: e.target.checked, location: e.target.checked ? 'Remote' : '' })
              }
            />
          </div>
        </div>

        <FormInput
          id="location"
          name="Location"
          info="Main work location, if not remote (e.g. Zug, Switzerland)"
          value={props.job.location}
          readOnly={props.job.remote}
          onChange={(value) => props.onChange({ ...props.job, location: value })}
        />

        <FormInput
          id="minSalary"
          name="Min. Salary range"
          info="US employers are required by law to share a salary range when hiring. Jobs with salary ranges also improve the amount of views. Add a minimum (or equivalent) of the gross, annual salary or compensation in USD"
          placeholder="60000"
          value={props.job.minSalary ? props.job.minSalary.toString() : ''}
          onChange={(value) => props.onChange({ ...props.job, minSalary: Number(value) })}
          required
        />

        <FormInput
          id="maxSalary"
          name="Max. Salary range"
          info="US employers are required by law to share a salary range when hiring. Jobs with salary ranges also improve the amount of views. Add a maximum (or equivalent) of the gross, annual salary or compensation in USD"
          placeholder="90000"
          value={props.job.maxSalary ? props.job.maxSalary.toString() : ''}
          onChange={(value) => props.onChange({ ...props.job, maxSalary: Number(value) })}
          required
        />

        <FormInput
          id="applicationUrl"
          name="Where to send applications to?"
          info="This can be a link to your ATS (e.g. Greenhouse, Lever) or an email address"
          placeholder="https://ethereum.bamboohr.com/jobs/view.php?id=1 - OR - hiring@useweb3.xyz"
          value={props.job.url}
          onChange={(value) => props.onChange({ ...props.job, url: value })}
          required
        />
      </div>
    </div>
  )
}
