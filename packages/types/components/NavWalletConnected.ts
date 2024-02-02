import { Wallet } from '@cosmos-kit/core'
import { ComponentType } from 'react'

import { WalletProfileData } from '../profile'
import { IconButtonLinkProps } from './IconButtonLink'
import { NotificationsProps } from './Notifications'

export type NavWalletConnectedProps = {
  wallet: Wallet
  walletAddress: string
  walletProfileData: WalletProfileData
  updateProfileName: (name: string | null) => Promise<void>
  onEditProfileImage: () => void
  disconnect: () => Promise<void>
  IconButtonLink: ComponentType<IconButtonLinkProps>
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * Whether or not to use a small connection icon instead of a large button.
   */
  compact?: boolean
  /**
   * Whether or not this is displayed in the responsive navigation sidebar.
   */
  inResponsiveNav?: boolean
} & Pick<NotificationsProps, 'InboxMainItemRenderer' | 'onCheck'>
