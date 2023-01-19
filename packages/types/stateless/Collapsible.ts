import { ComponentType, ReactNode } from 'react'

import { LinkWrapperProps } from './LinkWrapper'

export interface CollapsibleProps {
  label: string
  imageUrl?: string
  link?: {
    href: string
    LinkWrapper: ComponentType<LinkWrapperProps>
  }
  defaultCollapsed?: boolean
  onExpand?: (expanded: boolean) => void
  indentDropdownSize?: number
  noContentIndent?: boolean
  selected?: boolean
  children?: ReactNode | ReactNode[]
  containerClassName?: string
  headerClassName?: string
  contentContainerClassName?: string
}
