/* eslint-disable i18next/no-literal-string */

import clsx from 'clsx'

import { NavWalletProps } from '@dao-dao/types'

import { ConnectWallet, DisconnectWallet, NavWalletConnected } from '../wallet'

export const NavWallet = ({ mode, ...props }: NavWalletProps) => (
  <div
    className={clsx(
      'flex shrink-0 flex-col justify-center',
      mode === 'sidebar' &&
        '-mx-6 border-b border-border-secondary px-6 py-3 md:hidden',
      mode === 'header' &&
        'hidden self-stretch border-l border-border-secondary pl-3 md:flex lg:pl-4'
    )}
  >
    {props.connected ? (
      mode === 'sidebar' ? (
        <DisconnectWallet
          center
          className="w-full"
          onDisconnect={props.disconnect}
          variant="secondary"
        />
      ) : (
        <NavWalletConnected
          mode={mode}
          {...{
            ...props,
            connected: undefined,
          }}
        />
      )
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
