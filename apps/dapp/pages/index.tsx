// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { useSetRecoilState } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  commandModalVisibleAtom,
  queryFeaturedDaoDumpStatesFromIndexer,
} from '@dao-dao/state'
import {
  DaoCard,
  ProfileDisconnectedCard,
  ProfileHomeCard,
  useLoadingFeaturedDaoCardInfos,
  useLoadingFollowingDaoCardInfos,
} from '@dao-dao/stateful'
import { Home } from '@dao-dao/stateless'

const HomePage: NextPage = () => {
  const { connected } = useWallet()

  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos()
  const followingDaosLoading = useLoadingFollowingDaoCardInfos()

  return (
    <Home
      connected={connected}
      featuredDaosProps={{
        DaoCard,
        featuredDaos: featuredDaosLoading,
      }}
      followingDaosProps={{
        DaoCard,
        openSearch: () => setCommandModalVisible(true),
        followingDaos: followingDaosLoading,
      }}
      rightSidebarContent={
        connected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
    />
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    featuredDaoDumpStates: await queryFeaturedDaoDumpStatesFromIndexer().catch(
      () => null
    ),
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
