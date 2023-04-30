import { ComponentType, ReactNode } from 'react'

import { LinkWrapperProps } from './LinkWrapper'

export interface RowProps {
  Icon?: ComponentType<{ className: string }>
  label: string
  expandedLocalStorageKey?: string
  showBadge?: boolean
  onClick?: () => void
  children?: ReactNode
  rightNode?: ReactNode
  href?: string
  defaultExpanded?: boolean
  forceExpanded?: boolean
  compact?: boolean
  loading?: boolean
  selected?: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
  // If true, will use shallow routing
  // (https://nextjs.org/docs/routing/shallow-routing) for local links.
  shallow?: boolean
  containerClassName?: string
}
