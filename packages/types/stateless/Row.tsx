import { ComponentType, ReactNode } from 'react'

import { LinkWrapperProps } from './LinkWrapper'

export interface RowProps {
  Icon: ComponentType<{ className: string }>
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
  containerClassName?: string
}
