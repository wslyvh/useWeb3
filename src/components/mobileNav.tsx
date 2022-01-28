import * as React from 'react'
import { Sitenav } from './sitenav'

export interface IMobileNavProps {
  isOpen: boolean
}

export default function MobileNav(props: IMobileNavProps) {
  const { isOpen } = props
  if (!isOpen) {
    return null
  }
  return <Sitenav />
}
