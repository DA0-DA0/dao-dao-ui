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
      connectedOrConnecting: true
    } & Omit<ConnectedWalletProps, 'className'>)
  | ({
      connectedOrConnecting: false
    } & Omit<ConnectWalletProps, 'className'>)

export const SidebarWallet = (props: SidebarWalletProps) => (
  <div
    className={clsx(
      'flex shrink-0 flex-col justify-center',
      PAGE_HEADER_HEIGHT_CLASS_NAMES
    )}
  >
    {props.connectedOrConnecting ? (
      <ConnectedWallet
        {...{
          ...props,
          connectedOrConnecting: undefined,
        }}
      />
    ) : (
      <ConnectWallet
        center
        className="w-full"
        variant="secondary"
        {...{
          ...props,
          connectedOrConnecting: undefined,
        }}
      />
    )}
  </div>
)
