import { Tag } from '@mui/icons-material'
import { UiProps, WalletType, useWalletManager } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CopyToClipboardUnderline,
  ProfileImage,
} from '@dao-dao/stateless'

import { useWalletInfo } from '../../hooks'

export const CosmodalConnected = ({ connectedWallet }: UiProps) => {
  const { t } = useTranslation()

  const { disconnect } = useWalletManager()
  const { walletProfileData } = useWalletInfo()

  return connectedWallet ? (
    <div className="flex flex-col items-stretch gap-6">
      <div className="flex flex-col items-center">
        {/* Image */}
        <div className="relative">
          <ProfileImage
            imageUrl={walletProfileData.profile.imageUrl}
            loading={walletProfileData.loading}
            size="lg"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="object-no-repeat absolute -right-2 -bottom-2 h-6 w-6 object-contain object-center"
            src={connectedWallet.wallet.imageUrl}
            style={{
              filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 1))',
            }}
          />
        </div>
        {/* Name */}
        <p
          className={clsx(
            'title-text mt-4 mb-1 text-text-body',
            walletProfileData.loading && 'animate-pulse'
          )}
        >
          {walletProfileData.loading ? '...' : walletProfileData.profile.name}
        </p>
        {/* Address */}
        <div className="flex w-full min-w-0 flex-row items-center justify-center gap-1">
          <Tag className="!h-5 !w-5 text-icon-tertiary" />

          <CopyToClipboardUnderline
            className="text-sm !text-text-tertiary"
            takeAll
            value={connectedWallet.address}
          />
        </div>
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
