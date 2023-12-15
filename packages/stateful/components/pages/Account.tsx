import clsx from 'clsx'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  averageColorSelector,
  walletHexPublicKeySelector,
} from '@dao-dao/state/recoil'
import {
  ChainProvider,
  CopyableAddress,
  ErrorPage,
  Loader,
  PageHeaderContent,
  RightSidebarContent,
  SegmentedControls,
  WalletProfileHeader,
  useCachedLoadable,
  useCachedLoadingWithError,
  useThemeContext,
} from '@dao-dao/stateless'
import { MeTab, MeTabId, Theme } from '@dao-dao/types'
import {
  SITE_URL,
  getAccountPath,
  getConfiguredChains,
  isValidWalletAddress,
  transformBech32Address,
} from '@dao-dao/utils'

import { WalletActionsProvider } from '../../actions'
import { walletProfileDataSelector } from '../../recoil'
import { ButtonLink } from '../ButtonLink'
import { ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { AccountBalances } from './AccountBalances'
import { AccountDaos } from './AccountDaos'

export const Account: NextPage = () => {
  const { t } = useTranslation()

  const router = useRouter()
  const { address } = router.query || {}

  const validAddress =
    typeof address === 'string' && address
      ? isValidWalletAddress(address)
      : false

  if (!validAddress) {
    throw new Error('Invalid address.')
  }

  const tabs: MeTab[] = [
    {
      id: MeTabId.Daos,
      label: t('title.daos'),
      Component: AccountDaos,
    },
    {
      id: MeTabId.Balances,
      label: t('title.balances'),
      Component: AccountBalances,
    },
  ]

  const configuredChain = getConfiguredChains()[0]
  const walletAddress = transformBech32Address(
    address as string,
    configuredChain.chainId
  )

  const hexPublicKey = useCachedLoadingWithError(
    walletHexPublicKeySelector({
      chainId: configuredChain.chain.chain_id,
      walletAddress,
    })
  )

  const profileData = useRecoilValue(
    walletProfileDataSelector({
      chainId: configuredChain.chain.chain_id,
      address: walletAddress,
    })
  )

  const { setAccentColor, theme } = useThemeContext()
  // Get average color of image URL.
  const averageImgColorLoadable = useCachedLoadable(
    profileData.loading
      ? undefined
      : averageColorSelector(profileData.profile.imageUrl)
  )

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

  // Pre-fetch tabs.
  useEffect(() => {
    Object.values(MeTabId).forEach((tab) => {
      router.prefetch(getAccountPath(walletAddress, tab))
    })
  }, [router, walletAddress])

  const _tab = router.query.tab
  const tabPath = _tab && Array.isArray(_tab) ? _tab[0] : undefined
  const selectedTabId =
    // If tabPath is not a valid tab, default to first tab. This ensures that
    // the default `/me` page will render the first tab, and also that an
    // invalid tab was not passed, though that should be impossible because Next
    // will render any invalid tabs (not in the `getStaticPaths` function) with
    // a 404 page.
    tabPath && tabs.some(({ id }) => id === tabPath)
      ? (tabPath as MeTabId)
      : tabs[0].id

  const tabSelector = (
    <div className="flex flex-row items-center justify-center">
      <SegmentedControls
        onSelect={(tab) =>
          router.push(getAccountPath(walletAddress, tab), undefined, {
            shallow: true,
          })
        }
        selected={selectedTabId}
        tabs={tabs.map(({ id, label }) => ({
          label,
          value: id,
        }))}
      />
    </div>
  )

  return (
    <>
      <NextSeo
        description={t('info.accountPageDescription', {
          address: walletAddress,
        })}
        openGraph={{
          url: SITE_URL + router.asPath,
          title: t('title.account') + ': ' + walletAddress,
          description: t('info.accountPageDescription', {
            address: walletAddress,
          }),
        }}
        title={t('title.account') + ': ' + walletAddress}
      />

      <RightSidebarContent>
        <ProfileHomeCard />
      </RightSidebarContent>
      <PageHeaderContent
        className="mx-auto max-w-5xl"
        gradient
        rightNode={<div className="hidden sm:block">{tabSelector}</div>}
        title={t('title.account')}
      />

      <div className="mx-auto flex min-h-full max-w-5xl flex-col items-stretch gap-6">
        {!hexPublicKey.loading &&
        (hexPublicKey.errored || !hexPublicKey.data) ? (
          <ErrorPage title={t('error.couldntFindWallet')}>
            <ButtonLink href="/" variant="secondary">
              {t('button.returnHome')}
            </ButtonLink>
          </ErrorPage>
        ) : (
          <ChainProvider chainId={configuredChain.chain.chain_id}>
            <WalletActionsProvider address={walletAddress}>
              <WalletProfileHeader editable={false} profileData={profileData}>
                <CopyableAddress address={address as string} />
              </WalletProfileHeader>

              <div className="mb-4 -mt-2 sm:hidden">{tabSelector}</div>

              {tabs.map(({ id, Component }) => (
                <div
                  key={id}
                  className={clsx('grow', selectedTabId !== id && 'hidden')}
                >
                  <SuspenseLoader fallback={<Loader />}>
                    <Component />
                  </SuspenseLoader>
                </div>
              ))}
            </WalletActionsProvider>
          </ChainProvider>
        )}
      </div>
    </>
  )
}
