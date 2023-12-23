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

import { useWallet } from '../../hooks/useWallet'

export type WalletUiWalletListProps = Pick<WalletModalProps, 'walletRepo'> & {
  connect: (wallet: ChainWalletBase) => void
}

export const WalletUiWalletList = ({
  walletRepo,
  connect,
}: WalletUiWalletListProps) => {
  const { t } = useTranslation()
  const { isWalletConnecting } = useWallet()

  if (!walletRepo) {
    return null
  }

  const { current, isMobile } = walletRepo

  // Filter out non-mobile wallets on mobile (probably extensions).
  const wallets = isMobile
    ? walletRepo.platformEnabledWallets
    : walletRepo.wallets

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
    isWalletConnecting && current && current.walletName === wallet.walletName

  return (
    <div className="flex flex-col gap-2">
      {!isMobile && installedExtensionWallets.length > 0 && (
        <>
          <p className="primary-text truncate">{t('title.installedWallets')}</p>

          <div className="mb-4 grid grid-cols-3 gap-1">
            {installedExtensionWallets.map((wallet) => (
              <Button
                key={wallet.walletName}
                className={clsx(
                  'grow !p-3 !pt-4',
                  isConnectingTo(wallet) && 'animate-pulse'
                )}
                contentContainerClassName="flex-col !gap-3 justify-center items-center"
                onClick={() =>
                  isConnectingTo(wallet)
                    ? walletRepo.disconnect()
                    : connect(wallet)
                }
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
            onClick={() =>
              isConnectingTo(wallet) ? walletRepo.disconnect() : connect(wallet)
            }
            variant="ghost"
          >
            <WalletLogo logo={wallet.walletInfo.logo} />

            <p className="secondary-text text-center">
              {wallet.walletInfo.prettyName}
            </p>
          </Button>
        ))}
      </div>

      {notInstalledWallets.length > 0 && (
        <>
          <Collapsible
            containerClassName="mt-2 !gap-1"
            headerClassName="-ml-5"
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
                  onClick={() =>
                    isConnectingTo(wallet)
                      ? walletRepo.disconnect()
                      : connect(wallet)
                  }
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

      {web3AuthWallets.length > 0 && (
        <>
          <div
            className={clsx(
              'flex flex-row items-center gap-1',
              otherWallets.length > 0 && 'mt-2'
            )}
          >
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
                  onClick={() =>
                    isConnectingTo(wallet)
                      ? walletRepo.disconnect()
                      : connect(wallet)
                  }
                  variant="ghost"
                >
                  <WalletLogo logo={wallet.walletInfo.logo} />
                </Button>
              </Tooltip>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
