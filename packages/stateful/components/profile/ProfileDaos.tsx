import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { commandModalVisibleAtom } from '@dao-dao/state/recoil'
import { ProfileDaos as StatelessProfileDaos } from '@dao-dao/stateless'

import { useFeed } from '../../feed'
import { useLoadingFollowingDaoCardInfos, useProfile } from '../../hooks'
import { DaoCard } from '../dao/DaoCard'
import { LinkWrapper } from '../LinkWrapper'
import { WalletDaos } from '../wallet'
import { ProfileAddChains } from './ProfileAddChains'

export const ProfileDaos = () => {
  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  const followingDaosLoading = useLoadingFollowingDaoCardInfos()
  const feed = useFeed()

  const { chains } = useProfile({
    onlySupported: true,
  })

  const openSearch = useCallback(
    () => setCommandModalVisible(true),
    [setCommandModalVisible]
  )

  return (
    <StatelessProfileDaos
      ProfileAddChains={ProfileAddChains}
      WalletDaos={WalletDaos}
      chains={chains}
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
