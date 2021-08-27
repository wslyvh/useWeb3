import { useRef, useState } from 'react'
import { useOnOutsideClick } from 'hooks/useOnOutsideClick'
import styles from './dropdown.module.scss'

interface Props {
    items: Array<string>
    className?: string
    onSelect: (value: string) => void // eslint-disable-line no-unused-vars
}

export function Dropdown(props: Props) {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(props.items[0])
    useOnOutsideClick(ref, () => setOpen(false))

    let className = `block round ${styles.container}`
    if (props.className) className += ` ${props.className}`

    function onSelect(value: string) {
        if (value !== selected) {
            setSelected(value)
            props.onSelect(value)
        }
    }

    return (
        <div className={className} ref={ref} onClick={() => setOpen(!open)}>
            <div className={`${styles.selected}`}>
                <p>{selected}</p>
                <p>&#9660;</p>
            </div>

            {props.items.length > 0 && open && (
                <ul className={styles.dropdown}>
                    {props.items.map(i => {
                        return <li key={i} onClick={() => onSelect(i)}>{i}</li>
                    })}
                </ul>
            )}
        </div>
        
    )
}
