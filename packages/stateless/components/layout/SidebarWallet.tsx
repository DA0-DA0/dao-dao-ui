import clsx from 'clsx'

import {
  ConnectWallet,
  ConnectWalletProps,
  ConnectedWallet,
  ConnectedWalletProps,
} from '../wallet'
import { ConnectWalletIcon } from '../wallet/ConnectWalletIcon'

export type SidebarWalletProps = {
  containerClassName?: string
  compact?: boolean
} & (
  | ({
      connected: true
    } & Omit<ConnectedWalletProps, 'className'>)
  | ({
      connected: false
    } & Pick<ConnectWalletProps, 'onConnect' | 'loading'>)
)

export const SidebarWallet = ({
  containerClassName,
  compact,
  ...props
}: SidebarWalletProps) => (
  <div
    className={clsx(
      'flex shrink-0 flex-col justify-center',
      containerClassName
    )}
  >
    {props.connected ? (
      <ConnectedWallet
        compact={compact}
        {...{
          ...props,
          connected: undefined,
        }}
      />
    ) : compact ? (
      <ConnectWalletIcon
        {...{
          ...props,
          connected: undefined,
        }}
      />
    ) : (
      <ConnectWallet
        center
        className="w-full"
        variant="brand"
        {...{
          ...props,
          connected: undefined,
        }}
      />
    )}
  </div>
)
