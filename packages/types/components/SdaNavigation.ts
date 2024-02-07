import { ComponentType } from 'react'

import { DaoTab } from '../dao'
import { LinkWrapperProps } from './LinkWrapper'

export interface SdaNavigationProps {
  tabs: DaoTab[]
  compact: boolean
  setCompact: (compact: boolean) => void
  mountedInBrowser: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
  SidebarWallet: ComponentType
}
