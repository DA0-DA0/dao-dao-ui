import { ComponentType, ReactNode } from 'react'

import { CommandModalContextMaker } from '../command'
import { InboxState } from '../inbox'
import { PageHeaderProps } from './PageHeader'

export interface IAppLayoutContext {
  responsiveNavigation: {
    enabled: boolean
    toggle: () => void
  }
  responsiveRightSidebar: {
    enabled: boolean
    toggle: () => void
  }
  updateProfileNft: {
    visible: boolean
    toggle: () => void
  }
  RightSidebarContent: ComponentType<{ children: ReactNode }>
  PageHeader: ComponentType<PageHeaderProps>
  setRootCommandContextMaker: (
    rootCommandContextMaker: CommandModalContextMaker
  ) => void
  inbox: InboxState
}
