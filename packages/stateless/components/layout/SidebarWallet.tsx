import clsx from 'clsx'

import {
  ConnectWallet,
  ConnectWalletProps,
  ConnectedWallet,
  ConnectedWalletProps,
} from '../wallet'

export type SidebarWalletProps = { containerClassName?: string } & (
  | ({
      connected: true
    } & Omit<ConnectedWalletProps, 'className'>)
  | ({
      connected: false
    } & Omit<ConnectWalletProps, 'className'>)
)

export const SidebarWallet = ({
  containerClassName,
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
