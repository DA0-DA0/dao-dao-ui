import { ChainWalletBase, WalletModalProps } from '@cosmos-kit/core'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Collapsible,
  Tooltip,
  TooltipInfoIcon,
  WalletLogo,
} from '@dao-dao/stateless'

export type WalletUiWalletListProps = Pick<WalletModalProps, 'walletRepo'> & {
  connect: (wallet: ChainWalletBase) => void
}

export const WalletUiWalletList = ({
  walletRepo,
  connect,
}: WalletUiWalletListProps) => {
  const { t } = useTranslation()

  if (!walletRepo) {
    return null
  }

  const { current, isMobile, platformEnabledWallets: wallets } = walletRepo

  const web3AuthWallets = wallets.filter((wallet) =>
    wallet.walletName.startsWith('web3auth_')
  )

  const otherWallets = wallets.filter(
    (wallet) => !wallet.walletName.startsWith('web3auth_')
  )
  const installedExtensionWallets = otherWallets.filter(
    (wallet) => !wallet.isModeWalletConnect && !wallet.isWalletNotExist
  )
  const mobileWallets = otherWallets.filter(
    (wallet) => wallet.isModeWalletConnect
  )
  const notInstalledWallets = otherWallets.filter(
    (wallet) => wallet.isWalletNotExist
  )

  const isConnectingTo = (wallet: ChainWalletBase) =>
    current?.isWalletConnecting && current.walletName === wallet.walletName

  const makeWalletOnClick = (wallet: ChainWalletBase) => async () => {
    try {
      await current?.disconnect(true)
    } catch (error) {
      console.error('Failed disconnecting from current wallet', error)
    }

    if (!isConnectingTo(wallet)) {
      connect(wallet)
    }
  }

  const mobileWalletsRender = (
    <div className="flex flex-col gap-2 border-b border-border-base py-6 px-8">
      <p className="primary-text truncate">{t('title.mobileWallets')}</p>
      <div className="grid grid-cols-3 gap-1">
        {mobileWallets.map((wallet) => (
          <Button
            key={wallet.walletName}
            className={clsx(
              'grow !p-3 !pt-4',
              isConnectingTo(wallet) && 'animate-pulse'
            )}
            contentContainerClassName="flex-col !gap-3 justify-center items-center"
            onClick={makeWalletOnClick(wallet)}
            variant="ghost"
          >
            <WalletLogo logo={wallet.walletInfo.logo} />

            <p className="secondary-text text-center">
              {wallet.walletInfo.prettyName}
            </p>
          </Button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="-m-6 flex flex-col">
      {isMobile && mobileWalletsRender}

      {installedExtensionWallets.length + notInstalledWallets.length > 0 && (
        <div className="flex flex-col gap-3 border-b border-border-base py-6 px-8">
          {installedExtensionWallets.length > 0 && (
            <>
              <p className="primary-text truncate">
                {t('title.browserWallets')}
              </p>

              <div className="grid grid-cols-3 gap-1">
                {installedExtensionWallets.map((wallet) => (
                  <Button
                    key={wallet.walletName}
                    className={clsx(
                      'grow !p-3 !pt-4',
                      isConnectingTo(wallet) && 'animate-pulse'
                    )}
                    contentContainerClassName="flex-col !gap-3 justify-center items-center"
                    onClick={makeWalletOnClick(wallet)}
                    variant="ghost"
                  >
                    <WalletLogo logo={wallet.walletInfo.logo} />

                    <p className="secondary-text text-center">
                      {wallet.walletInfo.prettyName}
                    </p>
                  </Button>
                ))}
              </div>
            </>
          )}

          {notInstalledWallets.length > 0 && (
            <>
              <Collapsible
                containerClassName="!gap-1"
                defaultCollapsed={
                  // There are 3 wallets that always exist in a browser (two
                  // metamask snaps and ledger, so collapse if any additional).
                  installedExtensionWallets.length > 3
                }
                headerClassName="-ml-4"
                label={t('title.notInstalled')}
                noContentIndent
                tooltip={t('info.notInstalledWalletsTooltip')}
              >
                <div className="grid grid-cols-3 gap-1">
                  {notInstalledWallets.map((wallet) => (
                    <Button
                      key={wallet.walletName}
                      className={clsx(
                        'grow !p-3 !pt-4',
                        isConnectingTo(wallet) && 'animate-pulse'
                      )}
                      contentContainerClassName="flex-col !gap-3 justify-center items-center"
                      onClick={makeWalletOnClick(wallet)}
                      variant="ghost"
                    >
                      <WalletLogo logo={wallet.walletInfo.logo} />

                      <p className="secondary-text text-center">
                        {wallet.walletInfo.prettyName}
                      </p>
                    </Button>
                  ))}
                </div>
              </Collapsible>
            </>
          )}
        </div>
      )}

      {!isMobile && mobileWalletsRender}

      {web3AuthWallets.length > 0 && (
        <div className="flex flex-col gap-3 py-6 px-8">
          <div className="flex flex-row items-center gap-1">
            <p className="primary-text truncate">
              {t('info.socialLoginsPoweredByWeb3Auth')}
            </p>

            <TooltipInfoIcon
              size="sm"
              title={t('info.socialLoginWarning', {
                context: otherWallets.length === 0 ? 'onlySocial' : undefined,
              })}
              warning
            />
          </div>

          <div className="grid w-full grid-cols-2 grid-rows-2 gap-2 xs:flex xs:flex-row">
            {web3AuthWallets.map((wallet) => (
              <Tooltip
                key={wallet.walletName}
                title={wallet.walletInfo.prettyName}
              >
                <Button
                  className={clsx(
                    'grow !p-3',
                    isConnectingTo(wallet) && 'animate-pulse'
                  )}
                  contentContainerClassName="flex justify-center items-center"
                  onClick={makeWalletOnClick(wallet)}
                  variant="ghost"
                >
                  <WalletLogo logo={wallet.walletInfo.logo} />
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
