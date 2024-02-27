import { fromBech32 } from '@cosmjs/encoding'
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
  Account as StatelessAccount,
  useCachedLoadable,
  useCachedLoadingWithError,
  useThemeContext,
} from '@dao-dao/stateless'
import { Theme } from '@dao-dao/types'
import {
  ACCOUNT_PAGE_DESCRIPTION,
  ACCOUNT_PAGE_TITLE,
  SITE_URL,
  getConfiguredChains,
  isValidBech32Address,
  transformBech32Address,
} from '@dao-dao/utils'

import { walletProfileDataSelector } from '../../recoil'
import { ButtonLink } from '../ButtonLink'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'
import { AccountDaos } from './AccountDaos'

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
    getConfiguredChains().find(({ chain }) => chain.bech32_prefix === prefix) ||
    getConfiguredChains()[0]
  const accountAddress = transformBech32Address(
    address as string,
    configuredChain.chainId
  )

  const hexPublicKey = useCachedLoadingWithError(
    walletHexPublicKeySelector({
      chainId: configuredChain.chain.chain_id,
      walletAddress: accountAddress,
    })
  )

  const profileData = useRecoilValue(
    walletProfileDataSelector({
      chainId: configuredChain.chain.chain_id,
      address: accountAddress,
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
          ButtonLink={ButtonLink}
          SuspenseLoader={SuspenseLoader}
          address={accountAddress}
          hexPublicKey={hexPublicKey}
          profileData={profileData}
        />
      </ChainProvider>
    </>
  )
}
