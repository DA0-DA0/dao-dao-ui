import { State, WalletModalProps } from '@cosmos-kit/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal, WarningCard } from '@dao-dao/stateless'
import { processError } from '@dao-dao/utils'

import { useWallet } from '../../hooks'
import { WalletUiConnected } from './WalletUiConnected'
import { WalletUiConnectQr } from './WalletUiConnectQr'
import { WalletUiWalletList } from './WalletUiWalletList'

export const WalletUi = (props: WalletModalProps) => {
  const {
    isWalletDisconnected,
    isWalletConnecting,
    isWalletConnected,
    isWalletError,
    message: errorMessage,
  } = useWallet()
  const { t } = useTranslation()

  const [qrState, setQRState] = useState<State>(State.Init)
  const [qrErrorMessage, setQRErrorMessage] = useState<string>()

  const { isOpen, setOpen, walletRepo } = props
  if (!walletRepo) {
    return <></>
  }

  const { current } = walletRepo

  // Set QR URL update actions so this component refreshes when QR state
  // changes.
  if (
    current?.client &&
    'qrUrl' in current.client &&
    'setActions' in current.client
  ) {
    ;(current.client as any).setActions?.({
      qrUrl: {
        state: setQRState,
        message: setQRErrorMessage,
      },
    })
  }

  const showWalletConnectQr = isWalletConnecting && qrState === State.Done
  const title =
    isWalletDisconnected || isWalletError
      ? t('title.logInWith')
      : isWalletConnecting
      ? showWalletConnectQr
        ? t('title.scanQrCode')
        : current?.walletName.startsWith('web3auth_')
        ? t('title.loggingInToService', { service: current.walletPrettyName })
        : t('title.connectingToWallet', { wallet: current?.walletPrettyName })
      : isWalletConnected
      ? t('title.loggedIn')
      : ''

  return (
    <Modal
      containerClassName="!w-[24rem] !max-w-[90vw]"
      footerContent={
        isWalletError && errorMessage ? (
          <WarningCard
            content={
              errorMessage === "key doesn't exist"
                ? t('info.configureWalletModalExplanation')
                : processError(errorMessage, { forceCapture: false })
            }
          />
        ) : qrState === State.Error && qrErrorMessage ? (
          <WarningCard content={qrErrorMessage} />
        ) : undefined
      }
      header={{
        title,
      }}
      onClose={() => {
        // If not connected, disconnect, to interrupt active connection.
        if (!isWalletConnected && walletRepo && walletRepo.current) {
          walletRepo.disconnect()
        }

        // Close modal if not showing QR. If showing QR, the disconnect above
        // will go back to the wallet list.
        if (!showWalletConnectQr) {
          setOpen(false)
        }
      }}
      visible={isOpen}
    >
      {showWalletConnectQr ? (
        <WalletUiConnectQr walletRepo={walletRepo} />
      ) : isWalletConnected ? (
        <WalletUiConnected walletRepo={walletRepo} />
      ) : (
        <WalletUiWalletList
          connect={(wallet) => {
            // Reset QR State before next connection.
            setQRState(State.Init)
            setQRErrorMessage(undefined)

            // Connect to wallet.
            walletRepo.connect(wallet.walletName)
          }}
          walletRepo={walletRepo}
        />
      )}
    </Modal>
  )
}
