import { ComponentType, ReactNode } from 'react'

import { LinkWrapperProps } from './LinkWrapper'

export type DaoDropdownInfo = {
  chainId: string
  coreAddress: string
  imageUrl: string
  name: string
  subDaos?: DaoDropdownInfo[]
}

export type DaoDropdownProps = {
  dao: DaoDropdownInfo
  children?: ReactNode
  showSubDaos?: boolean
  indent?: number
  compact?: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
  defaultCollapsed?: boolean
}
