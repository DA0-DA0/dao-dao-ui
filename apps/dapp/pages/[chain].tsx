// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { commandModalVisibleAtom, walletChainIdAtom } from '@dao-dao/state'
import {
  DaoCard,
  LinkWrapper,
  ProfileDisconnectedCard,
  ProfileHomeCard,
  useLoadingFeaturedDaoCardInfos,
  useLoadingFollowingDaoCardInfos,
  useWallet,
} from '@dao-dao/stateful'
import { useFeed } from '@dao-dao/stateful/feed'
import { Home } from '@dao-dao/stateless'
import { getSupportedChains } from '@dao-dao/utils'

const ChainHomePage: NextPage = () => {
  const router = useRouter()
  const {
    query: { chain },
  } = router

  const supportedChain = chain
    ? getSupportedChains().find(({ name }) => name === chain)
    : undefined
  if (!supportedChain) {
    throw new Error('Invalid chain')
  }

  const chainId = supportedChain.chain.chain_id

  // Update wallet chain ID to the current chain.
  const setWalletChainId = useSetRecoilState(walletChainIdAtom)
  useEffect(() => setWalletChainId(chainId), [chainId, setWalletChainId])

  const { isWalletConnected } = useWallet()

  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos(chainId)
  const followingDaosLoading = useLoadingFollowingDaoCardInfos(chainId)
  const feed = useFeed({
    filter: {
      chainId,
    },
  })

  // Pre-fetch other chains.
  useEffect(() => {
    getSupportedChains().forEach(({ name }) => {
      router.prefetch('/' + name)
    })
  }, [router])

  return (
    <Home
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
        openSearch: () => setCommandModalVisible(true),
        followingDaos: followingDaosLoading,
      }}
      openSearch={() => setCommandModalVisible(true)}
      rightSidebarContent={
        isWalletConnected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
    />
  )
}

export default ChainHomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getSupportedChains().map(({ name }) => ({
    params: {
      chain: name,
    },
  })),
  fallback: false,
})
