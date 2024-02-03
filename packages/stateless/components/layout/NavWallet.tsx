/* eslint-disable i18next/no-literal-string */

import clsx from 'clsx'

import { NavWalletProps } from '@dao-dao/types'

import { ConnectWallet, NavWalletConnected } from '../wallet'
import { ConnectWalletIcon } from '../wallet/ConnectWalletIcon'

export const NavWallet = ({
  containerClassName,
  compact,
  ...props
}: NavWalletProps) => (
  <div
    className={clsx(
      'flex shrink-0 flex-col justify-center',
      props.inResponsiveNav &&
        '-mx-6 shrink-0 border-b border-border-secondary px-6 py-3 md:hidden',
      containerClassName
    )}
  >
    {props.connected ? (
      <NavWalletConnected
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
