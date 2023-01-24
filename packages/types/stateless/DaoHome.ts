import { ComponentType, ReactNode } from 'react'

import { DaoInfo } from '../dao'
import { FollowState } from './DaoCard'
import { LinkWrapperProps } from './LinkWrapper'
import { SuspenseLoaderProps } from './SuspenseLoader'

export type DaoHomeTab = {
  // ID used in URL hash.
  id: string
  label: string
  Component: ComponentType
}

export interface DaoHomeProps {
  daoInfo: DaoInfo
  follow: FollowState
  DiscordNotifierConfigureModal: ComponentType
  daoInfoBar: ReactNode
  rightSidebarContent: ReactNode
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  LinkWrapper: ComponentType<LinkWrapperProps>
  // Tabs
  ProposalsTab: ComponentType
  TreasuryAndNftsTab: ComponentType
  SubDaosTab: ComponentType
  extraTabs: DaoHomeTab[]
}
