import { ReactNode } from 'react'

export interface BreadcrumbsProps {
  crumbs: {
    href: string
    label: ReactNode
  }[]
  current: ReactNode
  className?: string
}
