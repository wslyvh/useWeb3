import { useState, useEffect } from "react";
import { ContentItem } from "types/content-item";
import styles from "pages/pages.module.scss";
import { Card } from "./card";
import { Dropdown } from "./dropdown";
import { Featured } from "./featured";

interface Props {
  title: string
  description?: string
  items: Array<ContentItem>
}

export function FilteredOverview(props: Props) {
  const [items, setItems] = useState<Array<ContentItem>>([])
  useEffect(() => {
    let sorted = [...props.items]
      .sort((a, b) => (a.dateAdded > b.dateAdded ? 1 : a.dateAdded === b.dateAdded ? 0 : -1))
      .reverse()
    setItems(sorted)
  }, [props.items])

  function onSort(value: string) {
    let sorted = [...items]
    if (value === 'Recently added') {
      sorted = sorted.sort((a, b) => (a.dateAdded > b.dateAdded ? 1 : a.dateAdded === b.dateAdded ? 0 : -1)).reverse()
    }
    if (value === 'Title') {
      sorted = sorted.sort((a, b) => (a.title > b.title ? 1 : a.title === b.title ? 0 : -1))
    }
    if (value === 'Expertise') {
      sorted = sorted.sort((a, b) => (a.level > b.level ? 1 : a.level === b.level ? 0 : -1))
    }

    setItems(sorted)
  }

  return (
    <>
      {props.description && (
        <article>
          <p dangerouslySetInnerHTML={{ __html: props.description }} />
        </article>
      )}

      <div className={styles.filter}>
        <p>Sort by:</p>
        <Dropdown
          className={styles.sort}
          items={['Recently added', 'Title', 'Expertise']}
          onSelect={(value) => onSort(value)}
        />
      </div>

      <main>
        <Featured>
          {items.map((i) => {
            return (
              <Card
                small
                key={i.id}
                title={i.title}
                description={i.description}
                author={i.authors.join(', ')}
                tag={i.level}
                detailsUrl={`/${i.category.id}/${i.id}`}
                url={i.url}
              />
            )
          })}
        </Featured>
      </main>

      {props.title === 'Books' && (
        <p>
          <small>
            * Links in the books category may contain referral links. Any proceeds will help and support this site.
          </small>
        </p>
      )}
    </>
  )
}
