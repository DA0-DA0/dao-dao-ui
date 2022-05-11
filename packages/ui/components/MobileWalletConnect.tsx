import { FC } from 'react'

import { Wallet } from '@dao-dao/icons'
import { LogoutIcon } from '@heroicons/react/outline'

import { WalletConnectProps } from './WalletConnect'
import clsx from 'clsx'

export const MobileWalletConnect: FC<WalletConnectProps> = ({
  walletAddress,
  walletName,
  walletBalance,
  walletBalanceDenom,
  onConnect,
  onDisconnect,
  className,
  ...buttonProps
}) =>
  walletAddress ? (
    <button
      className={clsx(
        'hover:outline-brand hover:outline bg-btn-secondary py-2 my-1 px-3 rounded-lg flex items-center justify-between',
        className
      )}
      onClick={walletAddress ? onDisconnect : onConnect}
      type="button"
      {...buttonProps}
    >
      <div className="flex gap-1 items-center w-full h-full justify-left">
        <Wallet fill="currentColor" height="18px" width="18px" />
        <p className="link-text">{walletName}</p>
      </div>
      <LogoutIcon className="w-4" />
    </button>
  ) : (
    <button
      className={clsx(
        'hover:outline-brand hover:outline py-2 px-3 my-1 bg-btn-secondary flex items-center gap-1 rounded-lg',
        className
      )}
      onClick={onConnect}
      type="button"
      size="sm"
      {...buttonProps}
    >
      <Wallet fill="currentColor" height="18px" width="18px" />
      <p className="link-text">Connect wallet</p>
    </button>
  )
