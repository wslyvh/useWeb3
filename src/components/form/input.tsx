import styles from './forms.module.scss'

interface InputProps {
    id: string
    name: string
    type?: 'textarea'
    info?: string
    placeholder?: string
    value?: string
    required?: boolean
    readOnly?: boolean
    rows?: number
    onChange: (value: string) => void
}

export function FormInput(props: InputProps) {
    return (
        <div className={styles.group}>
            <label className={styles.header} htmlFor={props.id}>{props.name} {props.required && <>*</>}</label>
            {props.info && <span className={styles.info}>{props.info}</span>}

            <div className="fixed wrapper block">
                {props.type === undefined && <input className={styles.disabled} onChange={(e) => props.onChange(e.target.value)}
                    placeholder={props.placeholder} value={props.value} name={props.id} id={props.id} required={props.required} readOnly={props.readOnly} />}

                {props.type === 'textarea' && <textarea onChange={(e) => props.onChange(e.target.value)}
                    placeholder={props.placeholder} value={props.value} name={props.id} id={props.id} required={props.required} readOnly={props.readOnly} rows={props.rows ?? 10} />}
            </div>
        </div>
    )
}