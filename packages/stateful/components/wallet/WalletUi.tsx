import { State, WalletModalProps } from '@cosmos-kit/core'
import { useTranslation } from 'react-i18next'

import { Modal, WarningCard } from '@dao-dao/stateless'
import { processError } from '@dao-dao/utils'

import { WalletUiConnected } from './WalletUiConnected'
import { WalletUiConnectQr } from './WalletUiConnectQr'
import { WalletUiWalletList } from './WalletUiWalletList'

export const WalletUi = (props: WalletModalProps) => {
  const { isOpen, setOpen, walletRepo } = props
  const { t } = useTranslation()

  if (!walletRepo) {
    return <></>
  }

  const {
    current,
    isWalletDisconnected,
    isWalletConnecting,
    isWalletConnected,
    isWalletError,
    message: errorMessage,
  } = walletRepo

  const showWalletConnectQr =
    isWalletConnecting && current?.qrUrl.state === State.Done

  const title =
    isWalletDisconnected || isWalletConnecting
      ? t('title.logInWith')
      : isWalletConnecting
      ? showWalletConnectQr
        ? t('title.scanQrCode')
        : current?.walletName.startsWith('web3auth_')
        ? t('title.loggingInToService', { service: current.walletName })
        : t('title.connectingToWallet', { wallet: current?.walletName })
      : isWalletConnected
      ? t('title.loggedIn')
      : ''

  return (
    <Modal
      footerContent={
        isWalletError &&
        !!errorMessage && (
          <WarningCard
            content={
              errorMessage === "key doesn't exist"
                ? t('info.configureWalletModalExplanation')
                : processError(errorMessage, { forceCapture: false })
            }
          />
        )
      }
      header={{
        title,
      }}
      onClose={() => setOpen(false)}
      visible={isOpen}
    >
      {showWalletConnectQr ? (
        <WalletUiConnectQr {...props} />
      ) : isWalletConnected ? (
        <WalletUiConnected {...props} />
      ) : (
        <WalletUiWalletList {...props} />
      )}
    </Modal>
  )
}
