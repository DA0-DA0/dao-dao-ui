import { UiProps, WalletConnectionStatus } from '@noahsaso/cosmodal'
import { wallets as WEB3AUTH_WALLETS } from '@noahsaso/cosmodal/dist/wallets/web3auth'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { walletModalVisibleAtom } from '@dao-dao/state/recoil'
import { Loader, Modal, Warning } from '@dao-dao/stateless'
import { processError } from '@dao-dao/utils'

import { CosmodalConnected } from './CosmodalConnected'
import { CosmodalWalletConnectQr } from './CosmodalWalletConnectQr'
import { CosmodalWalletList } from './CosmodalWalletList'

export const CosmodalUi = (props: UiProps) => {
  const {
    wallets,
    walletConnectUri,
    disconnect,
    status,
    connectingWallet,
    connectedWallet,
    error,
  } = props

  const { t } = useTranslation()

  const [visible, setVisible] = useRecoilState(walletModalVisibleAtom)
  // When moving to selecting a wallet, set open so it persists open once the
  // connection process is complete.
  useEffect(() => {
    if (status === WalletConnectionStatus.SelectingWallet) {
      setVisible(true)
    }
  }, [status, setVisible])

  const web3AuthWallets = wallets.filter((wallet) =>
    WEB3AUTH_WALLETS.includes(wallet)
  )

  const title =
    status === WalletConnectionStatus.ReadyForConnection ||
    status === WalletConnectionStatus.SelectingWallet
      ? t('title.logInWith')
      : status === WalletConnectionStatus.Connecting
      ? walletConnectUri
        ? t('title.scanQrCode')
        : connectingWallet && web3AuthWallets.includes(connectingWallet)
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
          <Warning content={processError(error, { forceCapture: false })} />
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
        <CosmodalWalletList {...props} />
      ) : showWalletConnect ? (
        <CosmodalWalletConnectQr {...props} />
      ) : status === WalletConnectionStatus.Resetting ? (
        <Loader size={42} />
      ) : status === WalletConnectionStatus.Connected ? (
        <CosmodalConnected {...props} />
      ) : null}
    </Modal>
  )
}
