import { useCallback } from 'react'
import {
  constSelector,
  useRecoilValueLoadable,
  useSetRecoilState,
  waitForAll,
} from 'recoil'

import { refreshOpenProposalsAtom } from '@dao-dao/state/recoil'
import {
  VetoableProposals as Renderer,
  VetoableProposalsProps,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { FeedSource, StatefulProposalLineProps } from '@dao-dao/types'
import { webSocketChannelNameForDao } from '@dao-dao/utils'

import { useOnWebSocketMessage, useProfile } from '../../../hooks'
import { followingDaosSelector } from '../../../recoil'
import { feedVetoableProposalsSelector } from './state'

export const VetoableProposals: FeedSource<
  VetoableProposalsProps<StatefulProposalLineProps>
> = {
  id: 'vetoable_proposals',
  Renderer,
  useData: (filter) => {
    const setRefresh = useSetRecoilState(refreshOpenProposalsAtom)
    const refresh = useCallback(() => setRefresh((id) => id + 1), [setRefresh])

    const { chains } = useProfile({
      onlySupported: true,
    })
    const filteredChains = chains.loading
      ? []
      : chains.data.filter(
          ({ chainId }) => !filter?.chainId || chainId === filter.chainId
        )

    const daosWithItemsLoadable = useCachedLoadable(
      !chains.loading
        ? waitForAll(
            filteredChains.map(({ chainId, publicKey }) =>
              feedVetoableProposalsSelector({
                chainId,
                hexPublicKey: publicKey,
              })
            )
          )
        : undefined
    )

    const followingDaosLoadable = useRecoilValueLoadable(
      !chains.loading
        ? waitForAll(
            filteredChains.map(({ chainId, publicKey }) =>
              followingDaosSelector({
                chainId,
                walletPublicKey: publicKey,
              })
            )
          )
        : constSelector([])
    )

    // Refresh when any proposal or vote is updated for any of the followed
    // DAOs.
    useOnWebSocketMessage(
      !chains.loading && followingDaosLoadable.state === 'hasValue'
        ? filteredChains.flatMap(
            ({ chainId }, index) =>
              followingDaosLoadable.contents[index]?.map((coreAddress) =>
                webSocketChannelNameForDao({
                  coreAddress,
                  chainId,
                })
              ) || []
          )
        : [],
      ['proposal', 'vote'],
      refresh
    )

    return {
      loading: daosWithItemsLoadable.state === 'loading',
      refreshing:
        daosWithItemsLoadable.state === 'hasValue' &&
        daosWithItemsLoadable.updating,
      daosWithItems:
        daosWithItemsLoadable.state === 'hasValue'
          ? daosWithItemsLoadable.contents.flat()
          : [],
      refresh,
    }
  },
}
