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
  WalletProfileHeader,
  useCachedLoadable,
  useCachedLoadingWithError,
  useThemeContext,
} from '@dao-dao/stateless'
import { Theme } from '@dao-dao/types'
import { SITE_URL, getSupportedChains } from '@dao-dao/utils'

import { walletProfileDataSelector } from '../../recoil'
import { ButtonLink } from '../ButtonLink'
import { LazyNftCard } from '../nft'
import { SuspenseLoader } from '../SuspenseLoader'
import { WalletBalances } from '../wallet'

export const Wallet: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { chain, address } = router.query || {}

  const supportedChain = getSupportedChains().find(({ name }) => name === chain)
  const walletAddress = typeof address === 'string' ? address : undefined

  if (!supportedChain || !walletAddress) {
    throw new Error('Unsupported chain or address.')
  }

  const hexPublicKey = useCachedLoadingWithError(
    walletHexPublicKeySelector({
      chainId: supportedChain.chain.chain_id,
      walletAddress,
    })
  )

  const profileData = useRecoilValue(
    walletProfileDataSelector({
      chainId: supportedChain.chain.chain_id,
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

  return (
    <>
      <NextSeo
        description={t('info.walletPageDescription', {
          address: walletAddress,
        })}
        openGraph={{
          url: SITE_URL + router.asPath,
          title: t('title.wallet') + ': ' + walletAddress,
          description: t('info.walletPageDescription', {
            address: walletAddress,
          }),
        }}
        title={t('title.wallet') + ': ' + walletAddress}
      />

      {!hexPublicKey.loading && (hexPublicKey.errored || !hexPublicKey.data) ? (
        <ErrorPage title={t('error.couldntFindWallet')}>
          <ButtonLink href="/" variant="secondary">
            {t('button.returnHome')}
          </ButtonLink>
        </ErrorPage>
      ) : (
        <ChainProvider chainId={supportedChain.chain.chain_id}>
          <div className="space-y-6">
            <WalletProfileHeader editable={false} profileData={profileData}>
              <CopyableAddress address={walletAddress} />
            </WalletProfileHeader>

            <SuspenseLoader fallback={<Loader />}>
              <WalletBalances
                NftCard={LazyNftCard}
                address={walletAddress}
                chainId={supportedChain.chain.chain_id}
                editable={false}
                hexPublicKey={
                  hexPublicKey.loading ||
                  hexPublicKey.errored ||
                  !hexPublicKey.data
                    ? { loading: true }
                    : {
                        loading: false,
                        updating: hexPublicKey.updating,
                        data: hexPublicKey.data,
                      }
                }
              />
            </SuspenseLoader>
          </div>
        </ChainProvider>
      )}
    </>
  )
}
