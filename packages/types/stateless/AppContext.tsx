import { MutableRefObject, ReactNode } from 'react'

import { CommandModalContextMaker } from '../command'
import { DaoPageMode } from '../dao'
import { InboxState } from '../inbox'

// App context used by all page modes.
export type CommonAppContext = {
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
}

export type IAppContext = CommonAppContext &
  // Dapp has command modal and inbox.
  (| {
        mode: DaoPageMode.Dapp

        // Command modal.
        rootCommandContextMaker: CommandModalContextMaker
        setRootCommandContextMaker: (
          rootCommandContextMaker: CommandModalContextMaker
        ) => void

        // Inbox.
        inbox: InboxState
      }
    // SDA has no command modal nor inbox.
    | {
        mode: DaoPageMode.Sda

        // Command modal.
        rootCommandContextMaker?: never
        setRootCommandContextMaker?: never

        // Inbox.
        inbox?: never
      }
  )

export type AppContextProviderProps = {
  children: ReactNode
}
