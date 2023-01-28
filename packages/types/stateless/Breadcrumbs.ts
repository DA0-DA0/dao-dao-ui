import { ReactNode } from 'react'

import { DaoTabId } from '../dao'

export type BreadcrumbCrumb = {
  href: string
  label: string
}

export interface BreadcrumbsProps {
  home?: boolean
  // Override the home tab crumb when in the SDA. For example, when viewing a
  // proposal, we probably want to link back to the proposals tab instead of
  // home.
  sdaHomeTab?: {
    id: DaoTabId
    label: string
  }
  current: ReactNode
  className?: string
}
