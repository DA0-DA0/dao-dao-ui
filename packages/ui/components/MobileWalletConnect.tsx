import {
  InformationCircleIcon,
  LogoutIcon,
  XIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Wallet } from '@dao-dao/icons'
import { Modal, WalletConnectProps } from '@dao-dao/ui'
import { CHAIN_NAME } from '@dao-dao/utils'

export const MobileWalletConnect = ({
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
}: WalletConnectProps) => {
  const { t } = useTranslation()

  return connected ? (
    <button
      className={clsx(
        'my-1 flex items-center justify-between rounded-lg border border-transparent bg-btn-secondary py-2 px-3 transition hover:border-brand',
        className
      )}
      disabled={connected && !onDisconnect}
      onClick={connected ? onDisconnect : onConnect}
      type="button"
      {...buttonProps}
    >
      <div className="justify-left flex h-full w-full items-center gap-1">
        <Wallet height="18px" width="18px" />
        <p className="link-text">{walletName}</p>
      </div>
      <LogoutIcon className="w-4" />
    </button>
  ) : (
    <button
      className={clsx(
        'my-1 flex items-center gap-1 rounded-lg border border-transparent bg-btn-secondary py-2 px-3 transition hover:border-brand',
        className
      )}
      onClick={onConnect}
      size="sm"
      type="button"
      {...buttonProps}
    >
      <Wallet height="18px" width="18px" />
      <p className="link-text">{t('button.connectWallet')}</p>
    </button>
  )
}

export const NoMobileWallet = () => {
  const { t } = useTranslation()
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <button
        className="my-1 -ml-6 flex w-full items-center gap-2 rounded-lg py-2 px-3"
        onClick={() => setShowInfo(true)}
      >
        <p className="link-text text-xs italic">{t('info.testnet')}</p>
        <InformationCircleIcon className="h-3 w-3" />
      </button>

      <Modal
        hideCloseButton
        onClose={() => setShowInfo(false)}
        visible={showInfo}
      >
        <div className="flex items-start gap-2">
          <p className="primary-text">
            {t('info.preReleaseExplanation', { chain: CHAIN_NAME })}
          </p>

          <button
            className="rounded-full transition hover:bg-secondary"
            onClick={() => setShowInfo(false)}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <p className="body-text mt-6">
          {t('info.walletConnectMobileLimitations', { chain: CHAIN_NAME })}
        </p>
      </Modal>
    </>
  )
}
