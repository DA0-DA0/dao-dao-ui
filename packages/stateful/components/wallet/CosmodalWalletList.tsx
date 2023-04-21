import { UiProps, Wallet, WalletConnectionStatus } from '@noahsaso/cosmodal'
import { wallets as WEB3AUTH_WALLETS } from '@noahsaso/cosmodal/dist/wallets/web3auth'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Button, Tooltip, TooltipInfoIcon } from '@dao-dao/stateless'

export const CosmodalWalletList = ({
  wallets,
  connectToWallet,
  status,
  connectingWallet,
}: UiProps) => {
  const { t } = useTranslation()

  const web3AuthWallets = wallets.filter((wallet) =>
    WEB3AUTH_WALLETS.includes(wallet)
  )
  const otherWallets = wallets.filter(
    (wallet) => !WEB3AUTH_WALLETS.includes(wallet)
  )

  const isConnectingTo = (wallet: Wallet) =>
    status === WalletConnectionStatus.Connecting &&
    !!connectingWallet &&
    connectingWallet.type === wallet.type

  return (
    <div className="flex flex-col gap-2">
      {otherWallets.map((wallet) => (
        <Button
          key={wallet.type}
          className={clsx('!p-4', isConnectingTo(wallet) && 'animate-pulse')}
          contentContainerClassName="!gap-3 text-left"
          disabled={
            // Disable if connecting to another wallet.
            status === WalletConnectionStatus.Connecting &&
            !isConnectingTo(wallet)
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
          <Tooltip key={wallet.type} title={wallet.name}>
            <Button
              className={clsx(
                'grow !p-3',
                isConnectingTo(wallet) && 'animate-pulse'
              )}
              contentContainerClassName="flex justify-center items-center"
              disabled={
                // Disable if connecting to another wallet.
                status === WalletConnectionStatus.Connecting &&
                !isConnectingTo(wallet)
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
    </div>
  )
}
