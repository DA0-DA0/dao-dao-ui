import clsx from 'clsx'

import { Loader } from '../Loader'
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
      'flex flex-col shrink-0 justify-center',
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
        className="self-end"
        {...{
          ...props,
          connected: undefined,
        }}
      />
    )}
  </div>
)

export const SidebarWalletLoading = () => (
  <Loader className="h-20" fill={false} />
)
