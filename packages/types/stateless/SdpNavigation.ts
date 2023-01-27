import { ComponentType } from 'react'

import { DaoTab } from '../dao'
import { LinkWrapperProps } from './LinkWrapper'

export interface SdpNavigationProps {
  tabs: DaoTab[]
  version: string
  compact: boolean
  setCompact: (compact: boolean) => void
  mountedInBrowser: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
}
