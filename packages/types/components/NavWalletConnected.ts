import { Wallet } from '@cosmos-kit/core'

import { WalletProfileData } from '../profile'
import { NotificationsProps } from './Notifications'

export type NavWalletConnectedProps = {
  wallet: Wallet
  walletAddress: string
  walletProfileData: WalletProfileData
  updateProfileName: (name: string | null) => Promise<void>
  onEditProfileImage: () => void
  disconnect: () => Promise<void>
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * The mode. This is used in the nav header on large screens, nav sidebar on
   * small screens, and dock on small screens.
   */
  mode: 'header' | 'sidebar' | 'dock'
} & Partial<Pick<NotificationsProps, 'inbox'>> &
  Pick<NotificationsProps, 'InboxMainItemRenderer'>
