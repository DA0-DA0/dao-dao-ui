import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state'
import {
  ChainPickerPopup,
  Logo,
  Home as StatelessHome,
} from '@dao-dao/stateless'
import {
  SITE_TITLE,
  SITE_URL,
  getSupportedChainConfig,
  getSupportedChains,
} from '@dao-dao/utils'

import { useLoadingFeaturedDaoCardInfos, useWallet } from '../../hooks'
import { DaoCard } from '../dao'
import { LinkWrapper } from '../LinkWrapper'
import { PageHeaderContent } from '../PageHeaderContent'
import { ProfileHome } from './ProfileHome'

export const Home = () => {
  const { t } = useTranslation()
  const { isWalletConnected } = useWallet()
  const router = useRouter()

  const _tab = router.query.tab
  const tabPath = _tab && Array.isArray(_tab) ? _tab[0] : undefined

  // If defined, try to find matching chain. If found, show chain-only page.
  const chainId = tabPath
    ? getSupportedChains().find(({ name }) => name === tabPath)?.chainId
    : undefined

  // Show profile page if wallet connected and not on a chain-only page.
  const onProfilePage = isWalletConnected && !chainId

  // Update wallet chain ID to the current chain if on a chain-only page.
  const setWalletChainId = useSetRecoilState(walletChainIdAtom)
  useEffect(() => {
    if (chainId) {
      setWalletChainId(chainId)
    }
  }, [chainId, setWalletChainId])

  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos(chainId)

  const chainPicker = (
    <ChainPickerPopup
      NoneIcon={Logo}
      chains={{ type: 'supported' }}
      headerMode
      noneLabel={t('info.allChains')}
      onSelect={(chainId) => {
        router.replace(
          `/${(chainId && getSupportedChainConfig(chainId)?.name) || ''}`,
          undefined,
          {
            shallow: true,
          }
        )
      }}
      selectedChainId={chainId}
      selectedLabelClassName="hidden xs:block"
      showNone
    />
  )

  return (
    <>
      <NextSeo
        openGraph={{
          url: SITE_URL + router.asPath,
        }}
      />

      {onProfilePage ? (
        <>
          <PageHeaderContent
            centerNode={
              // Show DAO DAO logo in header on mobile.
              <LinkWrapper
                className="flex flex-row items-center gap-2 md:hidden"
                href="/"
              >
                <Logo size={28} />
                <p className="header-text">{SITE_TITLE}</p>
              </LinkWrapper>
            }
          />

          <ProfileHome />
        </>
      ) : (
        <>
          <PageHeaderContent
            centerNode={<div className="md:hidden">{chainPicker}</div>}
            rightNode={<div className="hidden md:block">{chainPicker}</div>}
            title={t('title.home')}
            titleClassName="hidden md:block"
          />

          <StatelessHome
            featuredDaosProps={{
              Component: DaoCard,
              items: featuredDaosLoading,
            }}
          />
        </>
      )}
    </>
  )
}
