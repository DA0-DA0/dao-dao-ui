// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'
import { useSetRecoilState } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { commandModalVisibleAtom } from '@dao-dao/state'
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

const HomePage: NextPage = () => {
  const { isWalletConnected } = useWallet()

  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos()
  const followingDaosLoading = useLoadingFollowingDaoCardInfos()
  const feed = useFeed()

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

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
