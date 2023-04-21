import clsx from 'clsx'

import {
  ConnectWallet,
  ConnectWalletProps,
  ConnectedWallet,
  ConnectedWalletProps,
} from '../wallet'
import { PAGE_HEADER_HEIGHT_CLASS_NAMES } from './PageHeader'

export type SidebarWalletProps =
  | ({
      connected: true
    } & Omit<ConnectedWalletProps, 'className'>)
  | ({
      connected: false
    } & Omit<ConnectWalletProps, 'className'>)

export const SidebarWallet = (props: SidebarWalletProps) => (
  <div
    className={clsx(
      'flex shrink-0 flex-col justify-center',
      PAGE_HEADER_HEIGHT_CLASS_NAMES
    )}
  >
    {props.connected ? (
      <ConnectedWallet
        {...{
          ...props,
          connected: undefined,
        }}
      />
    ) : (
      <ConnectWallet
        center
        className="w-full"
        variant="secondary"
        {...{
          ...props,
          connected: undefined,
        }}
      />
    )}
  </div>
)
