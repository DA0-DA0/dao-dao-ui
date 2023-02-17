import { ComponentType, ReactNode } from 'react'

import { CommandModalContextMaker } from '../command'
import { DaoPageMode, DaoWebSocket } from '../dao'
import { InboxState } from '../inbox'
import { PageHeaderProps } from './PageHeader'
import { RightSidebarProps } from './RightSidebar'

export type IAppContext = {
  // DAO page mode.
  mode: DaoPageMode

  // Visibility toggles.
  responsiveNavigation: {
    enabled: boolean
    toggle: () => void
  }
  updateProfileNft: {
    visible: boolean
    toggle: () => void
  }
  responsiveRightSidebar: {
    enabled: boolean
    toggle: () => void
  }

  // Page header.
  PageHeader: ComponentType<PageHeaderProps>
  setPageHeaderRef: (ref: HTMLDivElement | null) => void

  // Right sidebar.
  RightSidebarContent: ComponentType<{ children: ReactNode }>
  setRightSidebarContentRef: RightSidebarProps['setContentRef']

  // Command modal.
  rootCommandContextMaker: CommandModalContextMaker
  setRootCommandContextMaker: (
    rootCommandContextMaker: CommandModalContextMaker
  ) => void

  // Inbox.
  inbox: InboxState

  // WebSocket.
  daoWebSocket: DaoWebSocket
}

export type AppContextProviderProps = {
  mode: DaoPageMode
  children: ReactNode
}
