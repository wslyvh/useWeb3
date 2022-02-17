import { Company } from 'types/company'
import styles from './forms.module.scss'
import { FormInput } from './input'
import { Pricing } from './pricing'
import { Search } from './search'

interface Props {
  company: Company
  onChange: (value: Company) => void
  className?: string
}

export function CompanyForm(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <h2>Step 1: Company Info</h2>
      <p className="muted">
        Please keep in mind that all the information shared here will be part of your public profile.
      </p>

      <div className={styles.form}>
        <div className={styles.group}>
          <Pricing />
        </div>

        <Search className={styles.group} onSelect={(company) => props.onChange(company)} />

        <FormInput
          id="title"
          name="Name"
          info="Name of your company/project"
          value={props.company.title}
          onChange={(value) => props.onChange({ ...props.company, title: value })}
          required
          readOnly={!!props.company.id}
        />

        <FormInput
          id="description"
          name="Description"
          info="Describe in short the mission of your company/project (max. 120 chars)"
          value={props.company.description}
          onChange={(value) => props.onChange({ ...props.company, description: value })}
          required
          readOnly={!!props.company.id}
        />

        <FormInput
          id="body"
          type="textarea"
          name="Info"
          info="Full description of what your company/project is doing (supports markdown)"
          value={props.company.body}
          onChange={(value) => props.onChange({ ...props.company, body: value })}
          readOnly={!!props.company.id}
        />

        <FormInput
          id="logo"
          name="Logo Url"
          info="Link to a square, 1:1 ratio logo (e.g. Github or Twitter profile picture)"
          placeholder="https://pbs.twimg.com/profile_images/1427622818074841091/Q6NYEk61_400x400.jpg"
          value={props.company.logo}
          onChange={(value) => props.onChange({ ...props.company, logo: value })}
          readOnly={!!props.company.id}
        />

        <FormInput
          id="website"
          name="Website"
          info="Link to your main website"
          placeholder="https://www.useweb3.xyz/"
          value={props.company.website}
          onChange={(value) => props.onChange({ ...props.company, website: value })}
          required
          readOnly={!!props.company.id}
        />

        <FormInput
          id="twitter"
          name="Twitter handle"
          info="Your Twitter handle (e.g. @useWeb3)"
          placeholder="@useWeb3"
          value={props.company.twitter}
          onChange={(value) => props.onChange({ ...props.company, twitter: value })}
          required
          readOnly={!!props.company.id}
        />

        <FormInput
          id="github"
          name="Github Url"
          info="Link to Github or open-source repositories"
          placeholder="https://github.com/wslyvh/useWeb3"
          value={props.company.github}
          onChange={(value) => props.onChange({ ...props.company, github: value })}
          required
          readOnly={!!props.company.id}
        />

        <FormInput
          id="externalJobBoard"
          name="Job board Url"
          info="Link to your own job board (e.g. Greenhouse, Lever, Angelist, etc.)"
          placeholder="https://ethereum.bamboohr.com/jobs/"
          value={props.company.externalJobBoard}
          onChange={(value) => props.onChange({ ...props.company, externalJobBoard: value })}
          readOnly={!!props.company.id}
        />
      </div>
    </div>
  )
}
