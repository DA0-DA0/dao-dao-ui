import { WalletModalProps } from '@cosmos-kit/core'
import {
  KeplrClient,
  wallets as keplrExtensionWallets,
} from '@cosmos-kit/keplr-extension'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { updateProfileNftVisibleAtom } from '@dao-dao/state/recoil'
import {
  Button,
  CopyableAddress,
  ProfileImage,
  ProfileNameDisplayAndEditor,
  Tooltip,
  WalletLogo,
  WarningCard,
} from '@dao-dao/stateless'

import { useWalletInfo } from '../../hooks'

const keplrExtensionWallet = keplrExtensionWallets[0]

export const WalletUiConnected = ({
  walletRepo,
}: Pick<WalletModalProps, 'walletRepo'>) => {
  const { t } = useTranslation()

  const { walletProfileData, updateProfileName } = useWalletInfo()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )

  if (!walletRepo?.current?.isWalletConnected) {
    return null
  }

  const isWeb3Auth = walletRepo.current.walletName.startsWith('web3auth_')

  return (
    <div className="flex flex-col items-stretch gap-6">
      {isWeb3Auth && (
        <WarningCard
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
            onEdit={() => setUpdateProfileNftVisible(true)}
            size="lg"
          />
          <Tooltip
            title={
              isWeb3Auth
                ? t('info.signedInAs', {
                    name: walletRepo?.current.walletPrettyName,
                  })
                : t('info.connectedTo', {
                    name: walletRepo?.current.walletPrettyName,
                  })
            }
          >
            <WalletLogo
              className="!absolute -right-2 -bottom-2"
              logo={walletRepo?.current.walletInfo.logo}
              size="md"
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
        <CopyableAddress address={walletRepo?.current.address ?? ''} />
      </div>

      {/* In Keplr mobile web, the wallet is force connected and cannot be logged out of, so only show the log out button for all other options. */}
      {(walletRepo?.current.walletInfo.name !==
        keplrExtensionWallet.walletInfo.name ||
        !(walletRepo?.current.client instanceof KeplrClient) ||
        walletRepo?.current.client.client.mode !== 'mobile-web') && (
        <Button
          center
          className="w-full"
          onClick={() => walletRepo?.current?.disconnect(true)}
          size="lg"
          variant="secondary"
        >
          {t('button.logOut')}
        </Button>
      )}
    </div>
  )
}
