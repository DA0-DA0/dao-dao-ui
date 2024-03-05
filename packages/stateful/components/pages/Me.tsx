import {
  ExtensionRounded,
  GroupRounded,
  WalletRounded,
} from '@mui/icons-material'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  averageColorSelector,
  mergeProfilesVisibleAtom,
  updateProfileNftVisibleAtom,
  walletChainIdAtom,
} from '@dao-dao/state/recoil'
import {
  ChainProvider,
  Loader,
  LogInRequiredPage,
  PageLoader,
  Profile as StatelessProfile,
  useCachedLoadable,
  useThemeContext,
} from '@dao-dao/stateless'
import { AccountTab, AccountTabId, Theme } from '@dao-dao/types'
import {
  PROFILE_PAGE_DESCRIPTION,
  PROFILE_PAGE_TITLE,
  SITE_URL,
  getConfiguredChainConfig,
  getConfiguredChains,
  transformBech32Address,
} from '@dao-dao/utils'

import { WalletActionsProvider } from '../../actions/react/provider'
import { useManageProfile } from '../../hooks'
import { useWallet } from '../../hooks/useWallet'
import { ConnectWallet } from '../ConnectWallet'
import { PageHeaderContent } from '../PageHeaderContent'
import { ProfileActions, ProfileWallet } from '../profile'
import { ProfileDaos } from '../profile/ProfileDaos'
import { SuspenseLoader } from '../SuspenseLoader'

export const Me: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const tabs: AccountTab[] = [
    {
      id: AccountTabId.Home,
      label: t('title.wallet'),
      Icon: WalletRounded,
      Component: ProfileWallet,
    },
    {
      id: AccountTabId.Daos,
      label: t('title.daos'),
      Icon: GroupRounded,
      Component: ProfileDaos,
    },
    {
      id: AccountTabId.Actions,
      label: t('title.actions'),
      Icon: ExtensionRounded,
      Component: ProfileActions,
    },
  ]

  const {
    address: walletAddress = '',
    isWalletConnected,
    isWalletConnecting,
  } = useWallet()
  const {
    profile,
    otherProfiles,
    updateProfile: { go: updateProfile },
  } = useManageProfile()

  const [walletChainId, setWalletChainId] = useRecoilState(walletChainIdAtom)
  // Switch to a valid chain if not configured.
  const configuredChainConfig = getConfiguredChainConfig(walletChainId)
  useEffect(() => {
    if (!configuredChainConfig) {
      setWalletChainId(getConfiguredChains()[0].chainId)
    }
  }, [configuredChainConfig, setWalletChainId])

  const { setAccentColor, theme } = useThemeContext()
  // Get average color of image URL.
  const averageImgColorLoadable = useCachedLoadable(
    profile.loading ? undefined : averageColorSelector(profile.data.imageUrl)
  )

  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )
  const setMergeProfilesVisible = useSetRecoilState(mergeProfilesVisibleAtom)

  // Set theme's accentColor.
  useEffect(() => {
    if (router.isFallback || averageImgColorLoadable.state !== 'hasValue') {
      return
    }

    const accentColor = averageImgColorLoadable.contents

    // Only set the accent color if we have enough contrast.
    if (accentColor) {
      const rgb = accentColor
        .replace(/^rgba?\(|\s+|\)$/g, '')
        .split(',')
        .map(Number)
      const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
      if (
        (theme === Theme.Dark && brightness < 100) ||
        (theme === Theme.Light && brightness > 255 - 100)
      ) {
        setAccentColor(undefined)
        return
      }
    }

    setAccentColor(accentColor ?? undefined)
  }, [
    setAccentColor,
    router.isFallback,
    theme,
    averageImgColorLoadable.state,
    averageImgColorLoadable.contents,
  ])

  return (
    <>
      <NextSeo
        description={PROFILE_PAGE_DESCRIPTION}
        openGraph={{
          url: SITE_URL + router.asPath,
          title: PROFILE_PAGE_TITLE,
          description: PROFILE_PAGE_DESCRIPTION,
        }}
        title={PROFILE_PAGE_TITLE}
      />

      <PageHeaderContent title={t('title.profile')} />

      {!configuredChainConfig ? (
        <PageLoader />
      ) : isWalletConnected ? (
        // Refresh all children when chain changes since state varies by chain.
        <ChainProvider key={walletChainId} chainId={walletChainId}>
          <WalletActionsProvider
            address={
              // Convert address to prevent blink on chain switch.
              walletAddress
                ? transformBech32Address(walletAddress, walletChainId)
                : undefined
            }
          >
            {/* Suspend to prevent hydration error since we load state on first render from localStorage. */}
            <SuspenseLoader fallback={<Loader />}>
              <StatelessProfile
                openMergeProfilesModal={() => setMergeProfilesVisible(true)}
                openProfileNftUpdate={() => setUpdateProfileNftVisible(true)}
                otherProfilesExist={otherProfiles.length > 0}
                profile={profile}
                tabs={tabs}
                updateProfile={updateProfile}
              />
            </SuspenseLoader>
          </WalletActionsProvider>
        </ChainProvider>
      ) : (
        <LogInRequiredPage
          connectWalletButton={<ConnectWallet />}
          connecting={isWalletConnecting}
        />
      )}
    </>
  )
}
