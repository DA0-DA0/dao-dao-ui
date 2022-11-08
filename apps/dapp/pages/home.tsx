// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { useSetRecoilState } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { commandModalVisibleAtom } from '@dao-dao/state'
import {
  DaoCard,
  ProfileHomeCard,
  useLoadingFeaturedDaoCardInfos,
  useLoadingPinnedDaoCardInfos,
} from '@dao-dao/stateful'
import { Home, ProfileDisconnectedCard } from '@dao-dao/stateless'

const HomePage: NextPage = () => {
  const { connected } = useWallet()

  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  // Load from indexer.
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
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
