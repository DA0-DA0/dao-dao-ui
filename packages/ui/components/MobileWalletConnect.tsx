import {
  LogoutIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'

import { Wallet } from '@dao-dao/icons'

import { WalletConnectProps, Modal } from '@dao-dao/ui'

export const MobileWalletConnect: FC<WalletConnectProps> = ({
  connected,
  walletName,
  onConnect,
  onDisconnect,
  className,
  // Need to take but ignore these fields so that they don't get passed
  // along to the button and make React mad.
  walletAddress: _a,
  walletBalance: _b,
  walletBalanceDenom: _d,
  ...buttonProps
}) =>
  connected ? (
    <button
      className={clsx(
        'flex justify-between items-center py-2 px-3 my-1 bg-btn-secondary rounded-lg border border-transparent hover:border-brand transition',
        className
      )}
      disabled={connected && !onDisconnect}
      onClick={connected ? onDisconnect : onConnect}
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
        'flex gap-1 items-center py-2 px-3 my-1 bg-btn-secondary rounded-lg border border-transparent hover:border-brand transition',
        className
      )}
      onClick={onConnect}
      size="sm"
      type="button"
      {...buttonProps}
    >
      <Wallet fill="currentColor" height="18px" width="18px" />
      <p className="link-text">Connect wallet</p>
    </button>
  )

export const NoMobileWallet: FC = () => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowInfo(true)}
        className="-ml-6 py-2 px-3 flex gap-2 items-center my-1 rounded-lg w-full"
      >
        <p className="link-text text-xs italic">Testnet</p>
        <InformationCircleIcon className="w-3 h-3" />
      </button>
      {showInfo && (
        <Modal>
          <div className="relative p-4 h-min bg-white rounded-lg border border-inactive cursor-auto">
            <div className="flex gap-2 items-start">
              <h1 className="primary-text">
                This is a pre-release version of DAO DAO running on the Juno
                testnet.
              </h1>
              <button
                className="hover:bg-secondary rounded-full transition"
                onClick={() => setShowInfo(false)}
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-6 body-text">
              Please feel free to explore the UI. Due to current limitations in
              WalletConnect you will not be able to connect your wallet while on
              your mobile device.
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}
