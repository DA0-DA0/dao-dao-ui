import { ReactNode } from 'react'

export interface DaoDropdownInfo {
  coreAddress: string
  imageUrl: string
  name: string
  subdaos?: DaoDropdownInfo[]
  content?: ReactNode
}

export interface DaoDropdownProps {
  dao: DaoDropdownInfo
  expandedLocalStorageKey?: string
  defaultExpanded?: boolean
  showSubdaos?: boolean
  indent?: number
  compact?: boolean
}
