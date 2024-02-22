import { ComponentType, ReactNode } from 'react'

import { ButtonLinkProps } from './Buttonifier'
import { DappNavigationProps } from './DappNavigation'

export type DappLayoutProps = {
  /**
   * Props for the DappNavigation component.
   */
  navigationProps: DappNavigationProps
  /**
   * Function to initiate the connection process.
   */
  connect: () => void
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
