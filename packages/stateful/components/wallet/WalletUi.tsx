import { AssetList } from '@chain-registry/types'
import { State, WalletModalProps, convertChain } from '@cosmos-kit/core'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Modal, WarningCard } from '@dao-dao/stateless'
import {
  getSupportedChains,
  maybeGetAssetListForChainId,
  processError,
} from '@dao-dao/utils'

import { useWallet } from '../../hooks'
import { WalletUiConnected } from './WalletUiConnected'
import { WalletUiConnectQr } from './WalletUiConnectQr'
import { WalletUiWalletList } from './WalletUiWalletList'

export const WalletUi = (props: WalletModalProps) => {
  const {
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
  const title = isWalletConnecting
    ? showWalletConnectQr
      ? t('title.scanQrCode')
      : current?.walletName.startsWith('web3auth_')
      ? t('title.loggingInToService', { service: current.walletPrettyName })
      : t('title.connectingToWallet', { wallet: current?.walletPrettyName })
    : isWalletConnected
    ? t('title.loggedIn')
    : t('title.logInWith')

  return (
    <Modal
      containerClassName="!w-[24rem] !max-w-[90dvw]"
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
          connect={async (wallet) => {
            // Reset QR State before next connection.
            setQRState(State.Init)
            setQRErrorMessage(undefined)

            // Connect to wallet.
            try {
              // Ensure supported chains are added before connecting.
              const supportedChains = getSupportedChains().map(({ chain }) =>
                convertChain(
                  chain,
                  [maybeGetAssetListForChainId(chain.chain_id)].filter(
                    (al): al is AssetList => !!al
                  )
                )
              )

              await Promise.all(
                supportedChains.map((chainRecord) =>
                  walletRepo
                    .getWallet(wallet.walletName)
                    ?.mainWallet.client.addChain?.(chainRecord)
                    .catch(console.error)
                )
              )

              await walletRepo.connect(wallet.walletName)
            } catch (err) {
              console.error(err)
              toast.error(err instanceof Error ? err.message : `${err}`)
            }
          }}
          walletRepo={walletRepo}
        />
      )}
    </Modal>
  )
}
