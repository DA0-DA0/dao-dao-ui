import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  Loader,
  LogInRequiredPage,
  Me as StatelessMe,
} from '@dao-dao/stateless'
import { SITE_URL, transformBech32Address } from '@dao-dao/utils'

import { WalletActionsProvider } from '../../actions/react/provider'
import { useWallet } from '../../hooks/useWallet'
import { useWalletInfo } from '../../hooks/useWalletInfo'
import { ChainSwitcher } from '../ChainSwitcher'
import { ConnectWallet } from '../ConnectWallet'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { MeBalances } from './MeBalances'
import { MeDaos } from './MeDaos'
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

  const chainId = useRecoilValue(walletChainIdAtom)

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
        // Refresh all children when chain changes since state varies by chain.
        <ChainProvider key={chainId} chainId={chainId}>
          <WalletActionsProvider
            address={
              // Convert address to prevent blink on chain switch.
              walletAddress
                ? transformBech32Address(walletAddress, chainId)
                : undefined
            }
          >
            {/* Suspend to prevent hydration error since we load state on first render from localStorage. */}
            <SuspenseLoader fallback={<Loader />}>
              <StatelessMe
                ChainSwitcher={ChainSwitcher}
                MeBalances={MeBalances}
                MeDaos={MeDaos}
                MeTransactionBuilder={MeTransactionBuilder}
                profileData={profileData}
                rightSidebarContent={<ProfileHomeCard />}
                updateProfileName={updateProfileName}
              />
            </SuspenseLoader>
          </WalletActionsProvider>
        </ChainProvider>
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
