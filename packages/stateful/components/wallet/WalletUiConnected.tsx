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
  WarningCard,
} from '@dao-dao/stateless'

import { useWallet, useWalletInfo } from '../../hooks'

const keplrExtensionWallet = keplrExtensionWallets[0]

export const WalletUiConnected = ({
  walletRepo,
}: Pick<WalletModalProps, 'walletRepo'>) => {
  const { t } = useTranslation()
  const { isWalletConnected } = useWallet()

  const { walletProfileData, updateProfileName } = useWalletInfo()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )

  if (!walletRepo?.current || !isWalletConnected) {
    return null
  }

  const { current, disconnect } = walletRepo

  const isWeb3Auth =
    isWalletConnected && current?.walletName.startsWith('web3auth_')

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
                    name: current.walletPrettyName,
                  })
                : t('info.connectedTo', {
                    name: current.walletPrettyName,
                  })
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="object-no-repeat absolute -right-2 -bottom-2 h-6 w-6 object-contain object-center"
              src={current.walletInfo.logo}
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
        <CopyableAddress address={current.address ?? ''} />
      </div>

      {/* In Keplr mobile web, the wallet is force connected and cannot be logged out of, so only show the log out button for all other options. */}
      {(current.walletName !== keplrExtensionWallet.walletName ||
        !(current.client instanceof KeplrClient) ||
        current.client.client.mode !== 'mobile-web') && (
        <Button
          center
          className="w-full"
          onClick={() => disconnect()}
          size="lg"
          variant="secondary"
        >
          {t('button.logOut')}
        </Button>
      )}
    </div>
  )
}
