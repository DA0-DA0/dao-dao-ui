import { Wallet } from '@cosmos-kit/core'
import { ComponentType } from 'react'

import { WalletProfileData } from '../profile'
import { ButtonLinkProps } from './Buttonifier'
import { NotificationsProps } from './Notifications'

export type NavWalletConnectedProps = {
  wallet: Wallet
  walletProfileData: WalletProfileData
  /**
   * Disconnect the wallet.
   */
  disconnect: () => void | Promise<void>
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * The mode. This is used in the nav header on large screens, nav sidebar on
   * small screens, and dock on small screens.
   */
  mode: 'header' | 'sidebar' | 'dock'
  /**
   * Stateful button link component.
   */
  ButtonLink: ComponentType<ButtonLinkProps>
} & Partial<Pick<NotificationsProps, 'inbox'>> &
  Pick<NotificationsProps, 'InboxMainItemRenderer'>
