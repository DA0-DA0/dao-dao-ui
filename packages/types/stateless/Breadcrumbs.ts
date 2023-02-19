import { ReactNode } from 'react'

import { DaoTabId } from '../dao'

export type BreadcrumbCrumb = {
  href: string
  label: string
}

export interface BreadcrumbsProps {
  home?: boolean
  // Override the home crumb tab. For example, when viewing a proposal, we
  // probably want to link back to the proposals tab instead of home. On the
  // SDA, the specified label is used. On the dApp, the name of the DAO is used.
  homeTab?: {
    id: DaoTabId
    sdaLabel: string
  }
  current: ReactNode
  className?: string
}
