import { useEffect, useState } from 'react'
import { Company, defaultCompany } from 'types/company'
import styles from './forms.module.scss'

interface Props {
  onSelect: (company: Company) => void
  className?: string
}

export function Search(props: Props) {
  let className = `${styles.search}`
  if (props.className) className += ` ${props.className}`

  const [open, setOpen] = useState(false)
  const [companies, setCompanies] = useState<Array<Company>>([])
  const [filtered, setFiltered] = useState<Array<Company>>([])

  useEffect(() => {
    async function asyncEffect() {
      const response = await fetch('/api/company')
      const body = await response.json()

      setCompanies(body.data)
    }

    asyncEffect()
  }, [])

  async function onChange(value: string) {
    if (value.length > 1) {
      const filtered = companies?.filter((i) => i.title.toLowerCase().includes(value.toLowerCase()))
      setFiltered(filtered)
      setOpen(true)
    } else {
      props.onSelect(defaultCompany)
      setFiltered([])
      setOpen(false)
    }
  }

  async function onSelect(company: Company) {
    props.onSelect(company)
    setOpen(false)
  }

  return (
    <div className={className}>
      <label className={styles.header} htmlFor="findCompany">
        Find Company
      </label>
      <span className={styles.info}>
        If you&apos;ve added your company before, you can search for it and skip this step.
      </span>

      <div className="fixed wrapper block">
        <input
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          placeholder="Search for your company.."
          name="findCompany"
          id="findCompany"
        />
      </div>

      <div className={styles.container}>
        {open && filtered.length > 0 && (
          <ul className={styles.dropdown}>
            {filtered.map((i) => {
              return (
                <li key={i.id} onClick={() => onSelect(i)}>
                  {i.title}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
