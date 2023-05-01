import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'
import { wallets as WEB3AUTH_WALLETS } from '@noahsaso/cosmodal/dist/wallets/web3auth'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { walletModalVisibleAtom } from '@dao-dao/state/recoil'
import { Loader, Modal, WarningCard } from '@dao-dao/stateless'
import { processError } from '@dao-dao/utils'

import { CosmodalConnected } from './CosmodalConnected'
import { CosmodalWalletConnectQr } from './CosmodalWalletConnectQr'
import { CosmodalWalletList } from './CosmodalWalletList'

export const CosmodalUi = () => {
  const { uiProps } = useWalletManager()
  const {
    walletConnectUri,
    disconnect,
    status,
    connectingWallet,
    connectedWallet,
    error,
  } = uiProps

  const { t } = useTranslation()

  const [visible, setVisible] = useRecoilState(walletModalVisibleAtom)
  // When moving to selecting a wallet, set open so it persists open once the
  // connection process is complete.
  useEffect(() => {
    if (status === WalletConnectionStatus.SelectingWallet) {
      setVisible(true)
    }
  }, [status, setVisible])

  const title =
    status === WalletConnectionStatus.ReadyForConnection ||
    status === WalletConnectionStatus.SelectingWallet
      ? t('title.logInWith')
      : status === WalletConnectionStatus.Connecting
      ? walletConnectUri
        ? t('title.scanQrCode')
        : connectingWallet && WEB3AUTH_WALLETS.includes(connectingWallet)
        ? t('title.loggingInToService', { service: connectingWallet.name })
        : t('title.connectingToWallet', { wallet: connectingWallet?.name })
      : status === WalletConnectionStatus.Resetting
      ? t('title.resetting')
      : status === WalletConnectionStatus.Connected && connectedWallet
      ? t('title.loggedIn')
      : ''

  const showWalletList =
    status === WalletConnectionStatus.ReadyForConnection ||
    status === WalletConnectionStatus.SelectingWallet ||
    (status === WalletConnectionStatus.Connecting && !walletConnectUri)
  const showWalletConnect =
    status === WalletConnectionStatus.Connecting && !!walletConnectUri

  return (
    <Modal
      footerContent={
        error && (
          <WarningCard content={processError(error, { forceCapture: false })} />
        )
      }
      header={{
        title,
      }}
      onClose={() => {
        setVisible(false)
        // If this modal is open and no wallet is connected, it is because the
        // user is in the process of connecting to a wallet. In this case,
        // cancel on close to interrupt the process.
        if (status !== WalletConnectionStatus.Connected) {
          disconnect()
        }
      }}
      visible={
        (visible &&
          (status === WalletConnectionStatus.ReadyForConnection ||
            status === WalletConnectionStatus.Connected)) ||
        status === WalletConnectionStatus.SelectingWallet ||
        status === WalletConnectionStatus.Connecting ||
        status === WalletConnectionStatus.Resetting
      }
    >
      {showWalletList ? (
        <CosmodalWalletList {...uiProps} />
      ) : showWalletConnect ? (
        <CosmodalWalletConnectQr {...uiProps} />
      ) : status === WalletConnectionStatus.Resetting ? (
        <Loader size={42} />
      ) : status === WalletConnectionStatus.Connected ? (
        <CosmodalConnected {...uiProps} />
      ) : null}
    </Modal>
  )
}