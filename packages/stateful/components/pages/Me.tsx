import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { WalletActionsProvider } from '@dao-dao/stateful/actions'
import {
  Loader,
  LogInRequiredPage,
  Me as StatelessMe,
} from '@dao-dao/stateless'
import { SITE_URL } from '@dao-dao/utils'

import { useWallet } from '../../hooks/useWallet'
import { useWalletInfo } from '../../hooks/useWalletInfo'
import { ConnectWallet } from '../ConnectWallet'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { MeBalances } from './MeBalances'
import { MeTransactionBuilder } from './MeTransactionBuilder'

export const Me: NextPage = () => {
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const {
    address: walletAddress = '',
    isWalletConnected,
    isWalletConnecting,
  } = useWallet()
  const { walletProfileData: profileData, updateProfileName } = useWalletInfo()

  return (
    <>
      <NextSeo
        description={t('info.meDescription')}
        openGraph={{
          url: SITE_URL + asPath,
          title: t('title.me'),
          description: t('info.meDescription'),
        }}
        title={t('title.me')}
      />

      {isWalletConnected ? (
        <WalletActionsProvider>
          {/* Suspend to prevent hydration error since we load state on first render from localStorage. */}
          <SuspenseLoader fallback={<Loader />}>
            <StatelessMe
              MeBalances={MeBalances}
              MeTransactionBuilder={MeTransactionBuilder}
              profileData={profileData}
              rightSidebarContent={<ProfileHomeCard />}
              updateProfileName={updateProfileName}
              walletAddress={walletAddress}
            />
          </SuspenseLoader>
        </WalletActionsProvider>
      ) : (
        <LogInRequiredPage
          connectWalletButton={<ConnectWallet />}
          connecting={isWalletConnecting}
          rightSidebarContent={<ProfileDisconnectedCard />}
          title={t('title.me')}
        />
      )}
    </>
  )
}
