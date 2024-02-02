import { BlurOn, Search } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { commandModalVisibleAtom, walletChainIdAtom } from '@dao-dao/state'
import {
  ChainPickerPopup,
  IconButton,
  Home as StatelessHome,
  Tooltip,
} from '@dao-dao/stateless'
import { getSupportedChainConfig, getSupportedChains } from '@dao-dao/utils'

import { useFeed } from '../../feed'
import {
  useLoadingFeaturedDaoCardInfos,
  useLoadingFollowingDaoCardInfos,
  useWallet,
} from '../../hooks'
import { DaoCard } from '../dao'
import { LinkWrapper } from '../LinkWrapper'
import { PageHeaderContent } from '../PageHeaderContent'

export const Home = () => {
  const { t } = useTranslation()
  const { isWalletConnected } = useWallet()
  const router = useRouter()

  const { chain } = router.query

  // If defined, on a chain-only home page.
  const chainId = chain
    ? getSupportedChains().find(({ name }) => name === chain)?.chainId
    : undefined

  // Update wallet chain ID to the current chain if on a chain-only home page.
  const setWalletChainId = useSetRecoilState(walletChainIdAtom)
  useEffect(() => {
    if (chainId) {
      setWalletChainId(chainId)
    }
  }, [chainId, setWalletChainId])

  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos(chainId)
  const followingDaosLoading = useLoadingFollowingDaoCardInfos(chainId)
  const feed = useFeed(
    chainId
      ? {
          filter: {
            chainId,
          },
        }
      : undefined
  )

  const openSearch = useCallback(
    () => setCommandModalVisible(true),
    [setCommandModalVisible]
  )

  // Pre-fetch chain-only pages.
  useEffect(() => {
    getSupportedChains().forEach(({ name }) => {
      router.prefetch('/' + name)
    })
  }, [router])

  const chainPicker = (
    <ChainPickerPopup
      NoneIcon={BlurOn}
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
      <PageHeaderContent
        centerNode={<div className="md:hidden">{chainPicker}</div>}
        leftMobileNode={
          <Tooltip title={t('title.search')}>
            <IconButton
              Icon={Search}
              className="h-7 w-7"
              iconClassName="!h-5 !w-5"
              onClick={openSearch}
              size="custom"
              variant="ghost"
            />
          </Tooltip>
        }
        rightNode={<div className="hidden md:block">{chainPicker}</div>}
        title={t('title.home')}
        titleClassName="hidden md:block"
      />

      <StatelessHome
        connected={isWalletConnected}
        featuredDaosProps={{
          Component: DaoCard,
          items: featuredDaosLoading,
        }}
        feedProps={{
          state: feed,
          LinkWrapper,
        }}
        followingDaosProps={{
          DaoCard,
          openSearch,
          followingDaos: followingDaosLoading,
        }}
      />
    </>
  )
}
