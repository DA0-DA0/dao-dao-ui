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
  useLoadingPinnedDaoCardInfos,
} from '@dao-dao/stateful'
import { Home } from '@dao-dao/stateless'

const HomePage: NextPage = () => {
  const { connected } = useWallet()

  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos()
  const pinnedDaosLoading = useLoadingPinnedDaoCardInfos()

  return (
    <Home
      connected={connected}
      featuredDaosProps={{
        DaoCard,
        featuredDaos: featuredDaosLoading,
      }}
      pinnedDaosProps={{
        DaoCard,
        openSearch: () => setCommandModalVisible(true),
        pinnedDaos: pinnedDaosLoading,
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
