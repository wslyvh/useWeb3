import React, { ReactNode } from 'react'
import { default as NextLink } from 'next/link'

interface LinkProps {
  href: string
  className?: string
  children: ReactNode
}

export function Link(props: LinkProps) {
  const className = props.className ?? ''
  const isExternal = props.href.match(/^([a-z0-9]*:|.{0})\/\/.*$/)

  if (isExternal) {
    return (
      <a href={props.href} className={className} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    )
  }

  return (
    <NextLink href={props.href} passHref>
      <a href={props.href} className={className}>
        {props.children}
      </a>
    </NextLink>
  )
}
