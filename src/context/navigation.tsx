import { createContext, ReactNode } from 'react'
import { Category } from 'types/category'

interface Props {
  categories: Array<Category>
  children: ReactNode
}

export const NavigationContext = createContext<Array<Category>>([])

export function NavigationProvider(props: Props) {
  return <NavigationContext.Provider value={props.categories}>{props.children}</NavigationContext.Provider>
}
