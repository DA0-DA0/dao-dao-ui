import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  Loader,
  LogInRequiredPage,
  Me as StatelessMe,
} from '@dao-dao/stateless'
import { SITE_URL, transformBech32Address } from '@dao-dao/utils'

import { WalletActionsProvider } from '../../actions/react/provider'
import { useWalletInfo } from '../../hooks/useWalletInfo'
import { ConnectWallet } from '../ConnectWallet'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { MeBalances } from './MeBalances'
import { MeTransactionBuilder } from './MeTransactionBuilder'

export const Me: NextPage = () => {
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const { connected, status } = useWallet()
  const {
    walletAddress,
    walletProfileData: profileData,
    updateProfileName,
  } = useWalletInfo()

  const [chainId, setChainId] = useRecoilState(walletChainIdAtom)

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

      {connected ? (
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
                MeBalances={MeBalances}
                MeTransactionBuilder={MeTransactionBuilder}
                profileData={profileData}
                rightSidebarContent={<ProfileHomeCard />}
                setChainId={setChainId}
                updateProfileName={updateProfileName}
              />
            </SuspenseLoader>
          </WalletActionsProvider>
        </ChainProvider>
      ) : (
        <LogInRequiredPage
          connectWalletButton={<ConnectWallet />}
          connecting={
            status === WalletConnectionStatus.Initializing ||
            status === WalletConnectionStatus.AttemptingAutoConnection ||
            status === WalletConnectionStatus.Connecting
          }
          rightSidebarContent={<ProfileDisconnectedCard />}
          title={t('title.me')}
        />
      )}
    </>
  )
}
