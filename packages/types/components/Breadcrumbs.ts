import { ReactNode } from 'react'

import { IDaoBase } from '../clients'
import { DaoTabId } from '../dao'

export type BreadcrumbCrumb = {
  href: string
  label: string
}

export type BreadcrumbsProps = {
  /**
   * Whether or not this crumb is the DAO's home. When true, the only crumb
   * shown before this one is the home page. When false, the DAO's name that the
   * current page is interacting with is shown.
   */
  home?: boolean
  /**
   * If true, the current crumb is rendered by itself (not in the button).
   */
  override?: boolean
  /**
   * Override the home crumb tab. For example, when viewing a proposal, we
   * probably want to link back to the proposals tab instead of home. On the
   * SDA, the specified label is used. On the dApp, the name of the DAO is used.
   */
  homeTab?: {
    id: DaoTabId
    sdaLabel: string
  }
  /**
   * The current crumb.
   */
  current: ReactNode
  /**
   * DAO, if this is being rendered outside of the context provider (like in the
   * PageHeader), but still needs access to the DAO.
   */
  dao?: IDaoBase | null
  /**
   * Optional container class name.
   */
  className?: string
}
