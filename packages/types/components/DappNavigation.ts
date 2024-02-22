import { ComponentType } from 'react'

import { LoadingData } from '../misc'
import { DaoDropdownInfo } from './DaoDropdown'
import { LinkWrapperProps } from './LinkWrapper'

export type DappNavigationProps = {
  /**
   * Function to open the command modal.
   */
  setCommandModalVisible: () => void
  /**
   * The number of notifications in the inbox.
   */
  inboxCount: LoadingData<number>
  /**
   * The DAOs the wallet is following.
   */
  followingDaos: LoadingData<DaoDropdownInfo[]>
  /**
   * Whether or not the wallet is connected.
   */
  walletConnected: boolean
  /**
   * Whether or not the navigation is compact.
   */
  compact: boolean
  /**
   * Function to set the compact state.
   */
  setCompact: (compact: boolean) => void
  /**
   * Whether or not the app is mounted in the browser.
   */
  mountedInBrowser: boolean
  /**
   * The LinkWrapper stateful component.
   */
  LinkWrapper: ComponentType<LinkWrapperProps>
  /**
   * The SidebarWallet stateful component.
   */
  SidebarWallet: ComponentType
}
