import { Wallet } from '@cosmos-kit/core'
import { ComponentType } from 'react'

import { LoadingData } from '../misc'
import { UnifiedProfile } from '../profile'
import { ButtonLinkProps } from './Buttonifier'
import { NotificationsProps } from './Notifications'

export type NavWalletConnectedProps = {
  /**
   * The currently connected wallet.
   */
  wallet: Wallet
  /**
   * The unified profile data.
   */
  profile: LoadingData<UnifiedProfile>
  /**
   * Disconnect the wallet.
   */
  disconnect: () => void | Promise<void>
  /**
   * If set, show a tooltip that explains there are multiple profiles attached
   * to the current wallet and prompt to merge them.
   */
  otherProfilesExist?: boolean
  /**
   * Callback to show merge profiles modal.
   */
  onMergeProfiles: () => void
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
