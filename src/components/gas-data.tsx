import styles from './gas-data.module.scss'

interface Props {
  className?: string
}

export function GasData(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <article className={className}>
      <section className={styles.columns}>
        <iframe src="https://dune.xyz/embeds/4300/8367/124d8351-8529-47fe-a38b-86d178dc6cdf" height="200" title="Median Gas Price" />
        <iframe src="https://dune.xyz/embeds/992/546444/910198e0-a6d1-4dba-b755-f8a36be1bd8a" height="200" title="Median Cost of Transfer" />
      </section>

      <section className={styles.full}>
        <iframe src="https://dune.xyz/embeds/992/1661/e9d63461-193e-4a3d-a231-684803df4cdb" height="400" title="Median Gas Price" />
      </section>
    </article>
  )
}
