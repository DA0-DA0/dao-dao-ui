import { ComponentType, ReactNode } from 'react'

import { DaoTabWithComponent } from '../dao'
import { SuspenseLoaderProps } from './SuspenseLoader'

export type DaoWrappedTabProps = {
  // All tabs that are available for the DAO. We pass all of them so we can
  // render them in the background so the data is already there when the user
  // switches to any tab.
  allTabs: DaoTabWithComponent[]
  // The tab ID that is currently active and thus should be visible. It should
  // be a `DaoTabId`. If invalid, the first tab is shown.
  tabId: string
  DiscordNotifierConfigureModal: ComponentType
  rightSidebarContent: ReactNode
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  // Whether or not to show the Discord notifier modal icon in the header.
  showDiscordNotifierConfigureModal: boolean
}
