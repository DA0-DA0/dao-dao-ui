import { ComponentType, ReactNode } from 'react'

import { LoadingData } from '../misc'
import { ButtonLinkProps } from './Buttonifier'
import { DappNavigationProps } from './DappNavigation'

export type DappLayoutProps = {
  /**
   * Props for the DappNavigation component.
   */
  navigationProps: DappNavigationProps
  /**
   * The number of notifications in the inbox.
   */
  inboxCount: LoadingData<number>
  /**
   * Function to initiate the connection process.
   */
  connect: () => void
  /**
   * PageHeader stateful component.
   */
  PageHeader: ComponentType
  /**
   * DockWallet stateful component.
   */
  DockWallet: ComponentType
  /**
   * ButtonLink stateful component.
   */
  ButtonLink: ComponentType<ButtonLinkProps>
  /**
   * App content.
   */
  children: ReactNode
}
