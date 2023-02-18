import { MutableRefObject, ReactNode } from 'react'

import { CommandModalContextMaker } from '../command'
import { DaoPageMode, DaoWebSocket } from '../dao'
import { InboxState } from '../inbox'

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
  pageHeaderRef: MutableRefObject<HTMLDivElement | null>
  setPageHeaderRef: (ref: HTMLDivElement | null) => void

  // Right sidebar.
  rightSidebarRef: MutableRefObject<HTMLDivElement | null>
  setRightSidebarRef: (ref: HTMLDivElement | null) => void

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
