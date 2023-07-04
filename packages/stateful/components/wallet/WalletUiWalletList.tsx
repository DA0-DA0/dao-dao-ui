import { ChainWalletBase, WalletModalProps } from '@cosmos-kit/core'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Button, Tooltip, TooltipInfoIcon } from '@dao-dao/stateless'

export const WalletUiWalletList = ({ walletRepo }: WalletModalProps) => {
  const { t } = useTranslation()

  if (!walletRepo) {
    return null
  }

  const { wallets, isWalletConnecting, current } = walletRepo

  const web3AuthWallets = wallets.filter((wallet) =>
    wallet.walletName.startsWith('web3auth_')
  )
  const otherWallets = wallets.filter(
    (wallet) => !wallet.walletName.startsWith('web3auth_')
  )

  const isConnectingTo = (wallet: ChainWalletBase) =>
    isWalletConnecting && current && current.walletName === wallet.walletName

  return (
    <div className="flex flex-col gap-2">
      {otherWallets.map((wallet) => (
        <Button
          key={wallet.walletName}
          className={clsx('!p-4', isConnectingTo(wallet) && 'animate-pulse')}
          contentContainerClassName="!gap-3 text-left"
          disabled={
            // Disable if connecting to another wallet.
            isWalletConnecting && !isConnectingTo(wallet)
          }
          onClick={() => wallet.connect()}
          variant="secondary"
        >
          {!!wallet.walletInfo.logo && (
            <div
              className="h-12 w-12 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${wallet.walletInfo.logo})`,
              }}
            />
          )}

          <div className="flex flex-col items-start gap-1">
            <p className="primary-text">{wallet.walletInfo.prettyName}</p>
            <p className="caption-text">A Wallet</p>
          </div>
        </Button>
      ))}

      {web3AuthWallets.length > 0 && (
        <>
          <div
            className={clsx(
              'flex flex-row items-center gap-1',
              otherWallets.length > 0 && 'mt-2'
            )}
          >
            <p>{t('info.socialLoginsPoweredByWeb3Auth')}</p>
            <TooltipInfoIcon
              className="!bg-background-interactive-warning"
              iconClassName="text-icon-interactive-warning"
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
                  disabled={
                    // Disable if connecting to another wallet.
                    isWalletConnecting && !isConnectingTo(wallet)
                  }
                  onClick={() => wallet.connect()}
                  variant="secondary"
                >
                  {!!wallet.walletInfo.logo && (
                    <div
                      className="h-12 w-12 bg-contain bg-center  bg-no-repeat"
                      style={{
                        backgroundImage: `url(${wallet.walletInfo.logo})`,
                      }}
                    />
                  )}
                </Button>
              </Tooltip>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
