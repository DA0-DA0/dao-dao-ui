import { UiProps, WalletType, useWalletManager } from '@noahsaso/cosmodal'
import { wallets as WEB3AUTH_WALLETS } from '@noahsaso/cosmodal/dist/wallets/web3auth'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CopyableAddress,
  ProfileImage,
  ProfileNameDisplayAndEditor,
  Tooltip,
  Warning,
  useAppContext,
} from '@dao-dao/stateless'

import { useWalletInfo } from '../../hooks'

export const CosmodalConnected = ({ connectedWallet }: UiProps) => {
  const { t } = useTranslation()

  const { disconnect } = useWalletManager()
  const { walletProfileData, updateProfileName } = useWalletInfo()
  const { updateProfileNft } = useAppContext()

  const isWeb3Auth =
    !!connectedWallet && WEB3AUTH_WALLETS.includes(connectedWallet.wallet)

  return connectedWallet ? (
    <div className="flex flex-col items-stretch gap-6">
      {isWeb3Auth && (
        <Warning
          content={t('info.socialLoginWarning', { context: 'onlySocial' })}
          size="sm"
        />
      )}

      <div className="flex flex-col items-center">
        {/* Image */}
        <div className="relative">
          <ProfileImage
            imageUrl={walletProfileData.profile.imageUrl}
            loading={walletProfileData.loading}
            onEdit={updateProfileNft.toggle}
            size="lg"
          />
          <Tooltip
            title={
              isWeb3Auth
                ? t('info.signedInAs', {
                    name: connectedWallet.name,
                  })
                : t('info.connectedTo', {
                    name: connectedWallet.name,
                  })
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="object-no-repeat absolute -right-2 -bottom-2 h-6 w-6 object-contain object-center"
              src={connectedWallet.wallet.imageUrl}
              style={{
                filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 1))',
              }}
            />
          </Tooltip>
        </div>
        {/* Name */}
        <ProfileNameDisplayAndEditor
          className="mt-4 mb-1"
          updateProfileName={updateProfileName}
          walletProfileData={walletProfileData}
        />
        {/* Address */}
        <CopyableAddress address={connectedWallet.address} />
      </div>

      {/* In Keplr mobile web, the wallet is force connected and cannot be logged out of, so only show the log out button for all other options. */}
      {(connectedWallet.wallet.type !== WalletType.Keplr ||
        connectedWallet.walletClient.mode !== 'mobile-web') && (
        <Button
          center
          className="w-full"
          onClick={disconnect}
          size="lg"
          variant="secondary"
        >
          {t('button.logOut')}
        </Button>
      )}
    </div>
  ) : null
}
