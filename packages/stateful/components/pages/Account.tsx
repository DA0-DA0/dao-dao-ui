import { fromBech32 } from '@cosmjs/encoding'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { chainQueries, miscQueries, profileQueries } from '@dao-dao/state/query'
import {
  ChainProvider,
  Account as StatelessAccount,
  useThemeContext,
} from '@dao-dao/stateless'
import { Theme } from '@dao-dao/types'
import {
  ACCOUNT_PAGE_DESCRIPTION,
  ACCOUNT_PAGE_TITLE,
  SITE_URL,
  getConfiguredChains,
  isValidBech32Address,
  makeEmptyUnifiedProfile,
  transformBech32Address,
} from '@dao-dao/utils'

import {
  useEntity,
  useQueryLoadingData,
  useQueryLoadingDataWithError,
} from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'
import { AccountDaos } from './AccountDaos'
import { AccountWallet } from './AccountWallet'

export const Account: NextPage = () => {
  const { t } = useTranslation()

  const router = useRouter()
  const { address } = router.query || {}

  const validAddress =
    typeof address === 'string' && address
      ? isValidBech32Address(address)
      : false

  if (!validAddress) {
    throw new Error('Invalid address.')
  }

  const { prefix } = fromBech32(address as string)
  // Choose first chain matching bech32 prefix.
  const configuredChain =
    getConfiguredChains().find(({ chain }) => chain.bech32Prefix === prefix) ||
    getConfiguredChains()[0]
  // Transform just in case there was no chain found and we defaulted to the
  // first configured chain.
  const accountAddress = transformBech32Address(
    address as string,
    configuredChain.chainId
  )

  const hexPublicKey = useQueryLoadingDataWithError(
    chainQueries.walletHexPublicKey({
      chainId: configuredChain.chainId,
      address: accountAddress,
    })
  )

  const profile = useQueryLoadingData(
    profileQueries.unified({
      chainId: configuredChain.chainId,
      address: accountAddress,
    }),
    makeEmptyUnifiedProfile(configuredChain.chainId, accountAddress)
  )
  const { entity } = useEntity(accountAddress)

  const { setAccentColor, theme } = useThemeContext()
  // Get average color of image URL.
  const averageImgColorLoading = useQueryLoadingDataWithError(
    profile.loading
      ? undefined
      : miscQueries.averageColor(profile.data.imageUrl)
  )

  // Set theme's accentColor.
  useEffect(() => {
    if (router.isFallback || averageImgColorLoading.loading) {
      return
    }

    const accentColor = averageImgColorLoading.errored
      ? undefined
      : averageImgColorLoading.data

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
  }, [setAccentColor, router.isFallback, theme, averageImgColorLoading])

  const pageTitle = ACCOUNT_PAGE_TITLE.replace('ADDRESS', accountAddress)
  const pageDescription = ACCOUNT_PAGE_DESCRIPTION.replace(
    'ADDRESS',
    accountAddress
  )

  return (
    <>
      <NextSeo
        description={pageDescription}
        openGraph={{
          url: SITE_URL + router.asPath,
          title: pageTitle,
          description: pageDescription,
        }}
        title={pageTitle}
      />

      <PageHeaderContent title={t('title.account')} />

      <ChainProvider chainId={configuredChain.chainId}>
        <StatelessAccount
          AccountDaos={AccountDaos}
          AccountWallet={AccountWallet}
          ButtonLink={ButtonLink}
          SuspenseLoader={SuspenseLoader}
          address={accountAddress}
          entity={entity}
          hexPublicKey={hexPublicKey}
          profile={profile}
        />
      </ChainProvider>
    </>
  )
}
