import { ComponentType, ReactNode } from 'react'

import { DaoTabWithComponent } from '../dao'
import { SuspenseLoaderProps } from './SuspenseLoader'

export type DaoWrappedTabProps = {
  tab: DaoTabWithComponent
  DiscordNotifierConfigureModal: ComponentType
  rightSidebarContent: ReactNode
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  showDiscordNotifierConfigureModal: boolean
}
