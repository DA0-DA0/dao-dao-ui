import { ComponentType, ReactNode } from 'react'

import { DaoTabWithComponent } from '../dao'
import { ButtonLinkProps } from './Buttonifier'
import { DaoSplashHeaderProps } from './DaoSplashHeader'
import { LinkWrapperProps } from './LinkWrapper'
import { SuspenseLoaderProps } from './SuspenseLoader'

export type DaoDappTabbedHomeProps = Omit<DaoSplashHeaderProps, 'daoInfo'> & {
  rightSidebarContent: ReactNode
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  ButtonLink: ComponentType<ButtonLinkProps>
  LinkWrapper: ComponentType<LinkWrapperProps>
  tabs: DaoTabWithComponent[]
  selectedTabId: string
  onSelectTabId: (tab: string) => void
  /**
   * If this DAO is not recognized by its parent DAO as a SubDAO, and the
   * current wallet is a member of the parent DAO, link to a new proposal in the
   * parent DAO with the SubDAO recognition action pre-filled.
   */
  parentProposalRecognizeSubDaoHref?: string
}
