import { ComponentType, ReactNode } from 'react'

import { LinkWrapperProps } from './LinkWrapper'

export interface DaoDropdownInfo {
  chainId: string
  coreAddress: string
  imageUrl: string
  name: string
  subdaos?: DaoDropdownInfo[]
  content?: ReactNode
}

export interface DaoDropdownProps {
  dao: DaoDropdownInfo
  showSubdaos?: boolean
  indent?: number
  compact?: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
  defaultCollapsed?: boolean
}
