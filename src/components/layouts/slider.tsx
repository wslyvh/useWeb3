import styles from './slider.module.scss'
import { default as ReactSlider } from 'react-slick'
import { createRef } from 'react'
import { ContentItem } from 'types/content-item'
import { PanelCard } from 'components/panel'

type Props = {
  items: Array<ContentItem>
  title?: string
  className?: string
}

var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  swipeToSlide: true,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

export function Slider(props: Props) {
  const ref = createRef<any>()
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      {props.title && (
        <div className={styles.title}>
          <h3>{props.title}</h3>
        </div>
      )}
      <div className={styles.slider}>
        <div className={styles.arrow}>
          <span role="button" className="accent block" onClick={() => ref.current.slickPrev()}>
            &laquo;
          </span>
        </div>

        <ReactSlider ref={ref} {...settings}>
          {props.items.map((i) => {
            return (
              <PanelCard
                key={i.id}
                title={i.title}
                icon={i.category.emoji}
                description={i.description}
                url={i.url}
                detailsUrl={`/${i.category.id}/${i.id}`}
                level={i.level}
                tags={i.tags}
              />
            )
          })}
        </ReactSlider>

        <div className={styles.arrow}>
          <span role="button" className="accent block" onClick={() => ref.current.slickNext()}>
            &raquo;
          </span>
        </div>
      </div>
    </div>
  )
}
