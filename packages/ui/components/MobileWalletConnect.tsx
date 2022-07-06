import {
  InformationCircleIcon,
  LogoutIcon,
  XIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'

import { Wallet } from '@dao-dao/icons'
import { Modal, WalletConnectProps } from '@dao-dao/ui'
import { CHAIN_NAME } from '@dao-dao/utils'

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
}) => {
  const { t } = useTranslation()

  return connected ? (
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
      <p className="link-text">{t('button.connectWallet')}</p>
    </button>
  )
}

export const NoMobileWallet: FC = () => {
  const { t } = useTranslation()
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <button
        className="flex gap-2 items-center py-2 px-3 my-1 -ml-6 w-full rounded-lg"
        onClick={() => setShowInfo(true)}
      >
        <p className="text-xs italic link-text">{t('info.testnet')}</p>
        <InformationCircleIcon className="w-3 h-3" />
      </button>
      {showInfo && (
        <Modal hideCloseButton onClose={() => setShowInfo(false)}>
          <div className="flex gap-2 items-start">
            <p className="primary-text">
              {t('info.preReleaseExplanation', { chain: CHAIN_NAME })}
            </p>

            <button
              className="hover:bg-secondary rounded-full transition"
              onClick={() => setShowInfo(false)}
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-6 body-text">
            {t('info.walletConnectMobileLimitations', { chain: CHAIN_NAME })}
          </p>
        </Modal>
      )}
    </>
  )
}
