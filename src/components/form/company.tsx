import { Organization } from 'types/org'
import styles from './forms.module.scss'
import { FormInput } from './input'
import { Pricing } from './pricing'
import { Search } from './search'

interface Props {
  org: Organization
  onChange: (value: Organization) => void
  className?: string
}

export function CompanyForm(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <h2>Step 1: Organization Info</h2>
      <p className="muted">
        Please keep in mind that all the information shared here will be part of your public profile.
      </p>

      <div className={styles.form}>
        <div className={styles.group}>
          <Pricing />
        </div>

        <Search className={styles.group} onSelect={(org) => props.onChange(org)} />

        {/* 
          id: org.id,
          ATS: org.ATS,
          externalBoardUrl: org.externalBoardUrl, 
      */}
        <FormInput
          id="title"
          name="Name"
          info="Name of your organization/project"
          value={props.org.title}
          onChange={(value) => props.onChange({ ...props.org, title: value })}
          required
          readOnly={!!props.org.id}
        />

        <FormInput
          id="description"
          name="Description"
          info="Describe in short the mission of your organization/project (max. 120 chars)"
          value={props.org.description}
          onChange={(value) => props.onChange({ ...props.org, description: value })}
          required
          readOnly={!!props.org.id}
        />

        <FormInput
          id="body"
          type="textarea"
          name="Info"
          info="Full description of what your organization/project is doing (supports markdown)"
          value={props.org.body}
          onChange={(value) => props.onChange({ ...props.org, body: value })}
          readOnly={!!props.org.id}
        />

        <FormInput
          id="logo"
          name="Logo Url"
          info="Link to a square, 1:1 ratio logo (e.g. Github or Twitter profile picture)"
          placeholder="https://pbs.twimg.com/profile_images/1427622818074841091/Q6NYEk61_400x400.jpg"
          value={props.org.logo}
          onChange={(value) => props.onChange({ ...props.org, logo: value })}
          readOnly={!!props.org.id}
        />

        <FormInput
          id="website"
          name="Website"
          info="Link to your main website"
          placeholder="https://www.useweb3.xyz/"
          value={props.org.website}
          onChange={(value) => props.onChange({ ...props.org, website: value })}
          required
          readOnly={!!props.org.id}
        />

        <FormInput
          id="twitter"
          name="Twitter handle"
          info="Your Twitter handle (e.g. @useWeb3)"
          placeholder="@useWeb3"
          value={props.org.twitter}
          onChange={(value) => props.onChange({ ...props.org, twitter: value })}
          required
          readOnly={!!props.org.id}
        />

        <FormInput
          id="github"
          name="Github Url"
          info="Link to Github or open-source repositories"
          placeholder="https://github.com/wslyvh/useWeb3"
          value={props.org.github}
          onChange={(value) => props.onChange({ ...props.org, github: value })}
          required
          readOnly={!!props.org.id}
        />

        <FormInput
          id="externalJobBoard"
          name="Job board Url"
          info="Link to your own job board (e.g. Greenhouse, Lever, Angelist, etc.)"
          placeholder="https://jobs.lever.co/ethereumfoundation/"
          value={props.org.externalBoardUrl}
          onChange={(value) => props.onChange({ ...props.org, externalBoardUrl: value })}
          readOnly={!!props.org.id}
        />
      </div>
    </div>
  )
}
