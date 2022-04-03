import { Alert } from 'components/alert'
import { Divider } from 'components/divider'
import { LinkButton } from 'components/link-button'
import { Progress } from 'components/progress'
import { marked } from 'marked'
import { Lesson, Track } from 'types/learn'
import styles from './container.module.scss'
import { Quiz } from './quiz'

interface Props {
  track: Track
  lesson: Lesson
  className?: string
}

export function Container(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  const index = props.track.lessons.map((i) => i.id).indexOf(props.lesson.id)
  const prev =
    index === 0 ? `/learn/${props.track.id}` : `/learn/${props.track.id}/${props.track.lessons[index - 1].id}`
  const next =
    index === props.track.lessons.length - 1
      ? !!props.track.reward
        ? `/learn/${props.track.id}/reward`
        : `/learn/${props.track.id}`
      : `/learn/${props.track.id}/${props.track.lessons[index + 1].id}`

  return (
    <section className={className}>
      <Progress current={index + 1} total={props.track.lessons.length} />

      <section className={styles.navigator}>
        <LinkButton href={prev} text="&laquo; Prev" type="secondary" />
        <LinkButton href={next} text="Next &raquo;" type="secondary" />
      </section>

      <section>
        <h2>{props.lesson.name}</h2>
        <p>{props.lesson.description}</p>

        <Divider />

        <article className="markdown" dangerouslySetInnerHTML={{ __html: marked.parse(props.lesson.body) }} />

        <Divider />

        {props.lesson.type === 'quiz' && <Quiz track={props.track} lesson={props.lesson} />}
      </section>

      {props.lesson.note && <Alert text={props.lesson.note} type="info" />}

      <section className={styles.navigator}>
        <LinkButton href={prev} text="&laquo; Prev" type="secondary" />
        <LinkButton href={next} text="Next &raquo;" type="secondary" />
      </section>
    </section>
  )
}
