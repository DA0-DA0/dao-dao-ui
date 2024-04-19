import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { commandModalVisibleAtom } from '@dao-dao/state/recoil'
import { ProfileHome as StatelessProfileHome } from '@dao-dao/stateless'

import { useFeed } from '../../feed'
import { useLoadingFollowingDaoCardInfos } from '../../hooks'
import { DaoCard } from '../dao/DaoCard'
import { LinkWrapper } from '../LinkWrapper'

export const ProfileHome = () => {
  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  const followingDaosLoading = useLoadingFollowingDaoCardInfos()
  const feed = useFeed()

  const openSearch = useCallback(
    () => setCommandModalVisible(true),
    [setCommandModalVisible]
  )

  return (
    <StatelessProfileHome
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
  )
}
