import { UiProps, WalletConnectionStatus } from '@noahsaso/cosmodal'
import { wallets as WEB3AUTH_WALLETS } from '@noahsaso/cosmodal/dist/wallets/web3auth'
import { isAndroid, isMobile } from '@walletconnect/browser-utils'
import clsx from 'clsx'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, LinkWrapper, Loader, Modal, Tooltip } from '@dao-dao/stateless'

import { Trans } from './Trans'

const IOS_KEPLR_MOBILE_URL = 'itms-apps://itunes.apple.com/app/1567851089'

export const CosmodalUi = ({
  wallets,
  connectToWallet,
  walletConnectUri,
  cancel,
  reset,
  status,
  connectingWallet,
}: UiProps) => {
  const { t } = useTranslation()
  const title =
    status === WalletConnectionStatus.SelectingWallet
      ? t('title.selectSignInMethod')
      : status === WalletConnectionStatus.Connecting
      ? walletConnectUri
        ? t('title.scanQrCode')
        : t('title.connectingToWallet', { wallet: connectingWallet?.name })
      : status === WalletConnectionStatus.Resetting
      ? t('title.resetting')
      : ''

  const web3AuthWallets = wallets.filter((wallet) =>
    WEB3AUTH_WALLETS.includes(wallet)
  )
  const otherWallets = wallets.filter(
    (wallet) => !WEB3AUTH_WALLETS.includes(wallet)
  )

  const mobile = isMobile()
  const android = isAndroid()

  // Defined if wallet connect URI exists and this is a mobile device..
  const navigateToMobileWalletConnectUrl =
    walletConnectUri &&
    (mobile
      ? android
        ? `intent://wcV1?${walletConnectUri}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;`
        : `keplrwallet://wcV1?${walletConnectUri}`
      : undefined)

  // Open app if mobile URL is available.
  useEffect(() => {
    if (
      status !== WalletConnectionStatus.Connecting ||
      !navigateToMobileWalletConnectUrl
    ) {
      return
    }

    // Slight delay so they can read the modal.
    const timeout = setTimeout(() => {
      window.location.href = navigateToMobileWalletConnectUrl
    }, 1000)

    return () => clearTimeout(timeout)
  }, [navigateToMobileWalletConnectUrl, status])

  const [qrShowing, setQrShowing] = useState(!mobile)

  // Show mobile help if timeout is reached.
  const [showMobileHelp, setShowMobileHelp] = useState(false)
  useEffect(() => {
    if (!mobile || status !== WalletConnectionStatus.Connecting) {
      setShowMobileHelp(false)
      return
    }

    const timeout = setTimeout(() => setShowMobileHelp(true), 5000)
    return () => clearTimeout(timeout)
  }, [status, mobile])

  return (
    <Modal
      header={{
        title,
      }}
      onClose={cancel}
      visible={
        status === WalletConnectionStatus.SelectingWallet ||
        status === WalletConnectionStatus.Connecting ||
        status === WalletConnectionStatus.Resetting
      }
    >
      {(status === WalletConnectionStatus.SelectingWallet ||
        (status === WalletConnectionStatus.Connecting &&
          !walletConnectUri)) && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 grid-rows-2 gap-2 xs:flex xs:flex-row">
            {web3AuthWallets.map((wallet) => (
              <Tooltip key={wallet.type} title={wallet.name}>
                <Button
                  className={clsx(
                    '!p-3',
                    connectingWallet?.type === wallet.type && 'animate-pulse'
                  )}
                  contentContainerClassName="flex justify-center items-center grow"
                  disabled={
                    connectingWallet && connectingWallet.type !== wallet.type
                  }
                  onClick={() => connectToWallet(wallet)}
                  variant="secondary"
                >
                  <div
                    className="h-12 w-12 bg-contain bg-center  bg-no-repeat"
                    style={{
                      backgroundImage: `url(${wallet.imageUrl})`,
                    }}
                  />
                </Button>
              </Tooltip>
            ))}
          </div>

          {otherWallets.length > 0 && (
            <>
              <p className="title-text mt-4 mb-2">{t('info.orSelectWallet')}</p>

              {otherWallets.map((wallet) => (
                <Button
                  key={wallet.type}
                  className={clsx(
                    '!p-4',
                    connectingWallet?.type === wallet.type && 'animate-pulse'
                  )}
                  contentContainerClassName="!gap-3 text-left"
                  disabled={
                    connectingWallet && connectingWallet.type !== wallet.type
                  }
                  onClick={() => connectToWallet(wallet)}
                  variant="secondary"
                >
                  <div
                    className="h-12 w-12 bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${wallet.imageUrl})`,
                    }}
                  />

                  <div className="flex flex-col items-start gap-1">
                    <p className="primary-text">{wallet.name}</p>
                    <p className="caption-text">{wallet.description}</p>
                  </div>
                </Button>
              ))}
            </>
          )}
        </div>
      )}

      {/* WalletConnect */}
      {status === WalletConnectionStatus.Connecting &&
        !!walletConnectUri &&
        qrShowing && (
          <>
            {!!navigateToMobileWalletConnectUrl && (
              <div className={clsx(qrShowing && 'mb-4')}>
                <p className="mb-4">
                  <Trans i18nKey="info.openMobileWalletAndAcceptConnection">
                    <LinkWrapper
                      className="underline"
                      href={navigateToMobileWalletConnectUrl}
                      openInNewTab
                    >
                      Open your mobile wallet
                    </LinkWrapper>{' '}
                    and accept the connection request.
                  </Trans>
                </p>

                <p className={clsx(showMobileHelp ? 'mb-4' : 'mb-6')}>
                  <Trans i18nKey="info.installKeplrMobileOrScanQrCode">
                    If you don&apos;t have Keplr Mobile installed,{' '}
                    <LinkWrapper
                      href={
                        android
                          ? navigateToMobileWalletConnectUrl
                          : IOS_KEPLR_MOBILE_URL
                      }
                      openInNewTab
                      style={{ textDecoration: 'underline' }}
                    >
                      click here to install it
                    </LinkWrapper>{' '}
                    or scan the QR code at the bottom with another device.
                  </Trans>
                </p>

                {showMobileHelp && (
                  <p className="mb-6">
                    <Trans i18nKey="info.keplrMobileReset">
                      If nothing shows up in Keplr Mobile,{' '}
                      <Button
                        className="inline"
                        onClick={reset}
                        variant="underline"
                      >
                        click here to reset
                      </Button>{' '}
                      and try connecting again. Refresh the page if the problem
                      persists.
                    </Trans>
                  </p>
                )}

                <Button
                  onClick={() => setQrShowing((s) => !s)}
                  variant="underline"
                >
                  {qrShowing ? t('button.hideQrCode') : t('button.showQrCode')}
                </Button>
              </div>
            )}

            <QRCode
              size={500}
              style={{ width: '100%', height: '100%' }}
              value={walletConnectUri}
            />
          </>
        )}

      {status === WalletConnectionStatus.Resetting && <Loader size={42} />}
    </Modal>
  )
}

/*
{
  modalOverlay: '!backdrop-brightness-50 !backdrop-filter',
  modalContent:
    '!p-6 !max-w-md !bg-background-base !rounded-lg !border !border-border-secondary !shadow-dp8',
  modalCloseButton:
    '!p-1 !text-icon-tertiary bg-transparent hover:!bg-background-interactive-hover active:!bg-background-interactive-pressed !rounded-full !transition !absolute !top-2 !right-2',
  modalHeader: '!header-text',
  modalSubheader: '!title-text',
  wallet:
    '!rounded-lg !bg-background-secondary !p-4 !shadow-none transition-opacity opacity-100 hover:opacity-80 active:opacity-70',
  walletName: '!primary-text',
  walletDescription: '!caption-text',
  textContent: '!body-text',
},
*/
