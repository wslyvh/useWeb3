import styles from './youtube-embed.module.scss'

interface Props {
  videoId: string
  title: string
}

export function YoutubeEmbed({ videoId, title }: Props) {
  return (
    <div className={`${styles['video-wrapper']}`}>
      <iframe src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen title={title} />
    </div>
  )
}
