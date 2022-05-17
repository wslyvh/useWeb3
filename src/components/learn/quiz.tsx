import { FormInput } from 'components/form/input'
import { FormEvent, useState } from 'react'
import { Lesson, Track } from 'types/learn'
import styles from './quiz.module.scss'
import formStyles from 'components/form/forms.module.scss'
import { Alert } from 'components/alert'

interface Props {
  track: Track
  lesson: Lesson
  className?: string
}

export function Quiz(props: Props) {
  let className = `${formStyles.container}`
  if (props.className) className += ` ${props.className}`
  const [answer, setAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)

  async function onChangeAnswer(value: string) {
    setShowResult(false)
    setAnswer(value)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('Submit quiz answer', answer)

    setShowResult(true)
  }

  return (
    <form className={className} onSubmit={handleSubmit} role="form">
      {showResult && answer === 'true' && <Alert text={'That is correct!'} type="success" />}
      {showResult && answer !== 'true' && <Alert text={'Not a correct answer. Try again.'} type="error" />}

      <FormInput
        id={props.lesson.id}
        name={props.lesson.name}
        placeholder="Enter your answer.."
        onChange={(value) => onChangeAnswer(value)}
        required
      />
    </form>
  )
}
