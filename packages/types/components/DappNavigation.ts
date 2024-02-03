import { ComponentType } from 'react'

import { LoadingData } from '../misc'
import { DaoDropdownInfo } from './DaoDropdown'
import { LinkWrapperProps } from './LinkWrapper'
import { StatefulNavWalletProps } from './NavWallet'

export type DappNavigationProps = {
  setCommandModalVisible: () => void
  inboxCount: LoadingData<number>
  followingDaos: LoadingData<DaoDropdownInfo[]>
  walletConnected: boolean
  compact: boolean
  setCompact: (compact: boolean) => void
  mountedInBrowser: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
  NavWallet: ComponentType<StatefulNavWalletProps>
}
