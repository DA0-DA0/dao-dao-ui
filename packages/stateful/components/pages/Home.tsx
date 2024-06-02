import { DehydratedState } from '@tanstack/react-query'
import clsx from 'clsx'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { commandModalVisibleAtom, walletChainIdAtom } from '@dao-dao/state'
import {
  ChainPickerPopup,
  Logo,
  Home as StatelessHome,
} from '@dao-dao/stateless'
import {
  DaoDaoIndexerAllStats,
  DaoInfo,
  DaoSource,
  LoadingData,
  StatefulDaoCardProps,
} from '@dao-dao/types'
import {
  SITE_TITLE,
  SITE_URL,
  UNDO_PAGE_PADDING_TOP_CLASSES,
  getSupportedChainConfig,
} from '@dao-dao/utils'

import {
  useLoadingDaos,
  useLoadingFeaturedDaoCards,
  useWallet,
} from '../../hooks'
import { DaoCard } from '../dao'
import { LinkWrapper } from '../LinkWrapper'
import { PageHeaderContent } from '../PageHeaderContent'
import { ProfileHome } from './ProfileHome'

export type StatefulHomeProps = {
  /**
   * Optionally show chain-specific home page.
   */
  chainId?: string
  /**
   * Stats for all chains or an individual chain if on a chain-specific home.
   */
  stats: DaoDaoIndexerAllStats
  /**
   * Optionally show chain x/gov DAOs.
   */
  chainGovDaos?: DaoInfo[]
  /**
   * Dehydrated react query state used by the server to preload data. This is
   * accessed in the _app.tsx file.
   */
  reactQueryDehydratedState?: DehydratedState
}

export const Home: NextPage<StatefulHomeProps> = ({
  chainId,
  stats,
  chainGovDaos: _chainGovDaos,
}) => {
  const { t } = useTranslation()
  const { isWalletConnected } = useWallet()
  const router = useRouter()

  // Show profile page if wallet connected and not on a chain-only page.
  const onProfilePage = isWalletConnected && !chainId

  // Update wallet chain ID to the current chain if on a chain-only page.
  const setWalletChainId = useSetRecoilState(walletChainIdAtom)
  useEffect(() => {
    if (chainId) {
      setWalletChainId(chainId)
    }
  }, [chainId, setWalletChainId])

  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)
  const openSearch = useCallback(
    () => setCommandModalVisible(true),
    [setCommandModalVisible]
  )

  const selectedChain = chainId ? getSupportedChainConfig(chainId) : undefined
  const selectedChainHasSubDaos = !!selectedChain?.subDaos?.length
  const chainSubDaos = useLoadingDaos(
    selectedChainHasSubDaos
      ? {
          loading: false,
          data:
            selectedChain?.subDaos?.map(
              (coreAddress): DaoSource => ({
                chainId: chainId!,
                coreAddress,
              })
            ) ?? [],
        }
      : {
          loading: true,
        }
  )

  const chainGovDaos: LoadingData<StatefulDaoCardProps[]> | undefined =
    selectedChainHasSubDaos && chainSubDaos.loading
      ? {
          loading: true,
        }
      : _chainGovDaos?.length ||
        (selectedChainHasSubDaos && !chainSubDaos.loading)
      ? {
          loading: false,
          data: [
            ...(_chainGovDaos || []),
            ...(!chainSubDaos.loading ? chainSubDaos.data : []),
          ].map((info): StatefulDaoCardProps => ({ info })),
        }
      : undefined

  const featuredDaosLoading = useLoadingFeaturedDaoCards(chainId)
  const featuredDaos: LoadingData<StatefulDaoCardProps[]> =
    !chainId || !chainGovDaos
      ? // If not on a chain-specific page, show all featured DAOs.
        featuredDaosLoading
      : featuredDaosLoading.loading || chainGovDaos.loading
      ? {
          loading: true,
        }
      : {
          loading: false,
          updating: featuredDaosLoading.updating,
          // On a chain-specific page, remove featured DAOs that show
          // up in the chain governance section.
          data: featuredDaosLoading.data.filter(
            (featured) =>
              !chainGovDaos.data.some(
                (chain) =>
                  featured.info.coreAddress === chain.info.coreAddress ||
                  // If the chain itself uses a real DAO for its
                  // governance, such as Neutron, hide it from
                  // featured as well since it shows up above. This is
                  // needed because the DAO in the featured list uses
                  // the DAO's real address, while the DAO in the
                  // chain x/gov list is the name of the chain.
                  featured.info.coreAddress ===
                    selectedChain?.govContractAddress
              )
          ),
        }

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
            centerNode={
              <>
                {/* Mobile, centered */}
                <ChainPickerPopup
                  NoneIcon={Logo}
                  buttonClassName="md:hidden"
                  chains={{ type: 'supported' }}
                  headerMode
                  noneLabel={t('info.allChains')}
                  onSelect={(chainId) => {
                    router.replace(
                      `/${
                        (chainId && getSupportedChainConfig(chainId)?.name) ||
                        ''
                      }`
                    )
                  }}
                  selectedChainId={chainId}
                  selectedLabelClassName="hidden xs:block"
                  showNone
                />

                {/* Large screen, left-aligned */}
                <ChainPickerPopup
                  NoneIcon={Logo}
                  buttonClassName="hidden md:block"
                  chains={{ type: 'supported' }}
                  headerMode
                  hideSelectedIcon
                  noneLabel={t('info.allChains')}
                  onSelect={(chainId) => {
                    router.replace(
                      `/${
                        (chainId && getSupportedChainConfig(chainId)?.name) ||
                        ''
                      }`
                    )
                  }}
                  selectedChainId={chainId}
                  selectedLabelClassName="!text-lg !header-text sm:!text-xl"
                  showNone
                />
              </>
            }
          />

          <div className={clsx('pt-6', UNDO_PAGE_PADDING_TOP_CLASSES)}>
            <StatelessHome
              DaoCard={DaoCard}
              chainGovDaos={chainGovDaos}
              featuredDaos={featuredDaos}
              openSearch={openSearch}
              stats={stats}
            />
          </div>
        </>
      )}
    </>
  )
}
