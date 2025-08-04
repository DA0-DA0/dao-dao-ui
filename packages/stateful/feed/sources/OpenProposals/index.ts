import { useCallback } from 'react'
import { constSelector, useSetRecoilState } from 'recoil'

import { refreshOpenProposalsAtom } from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
import { FeedSource } from '@dao-dao/types'
import { webSocketChannelNameForDao } from '@dao-dao/utils'

import {
  useFollowingDaos,
  useOnWebSocketMessage,
  useProfile,
  useRefreshGovProposals,
} from '../../../hooks'
import { OpenProposalsProposalLine } from './OpenProposalsProposalLineProps'
import { feedOpenProposalsSelector } from './state'
import { OpenProposalsProposalLineProps } from './types'

export const OpenProposals: FeedSource<OpenProposalsProposalLineProps> = {
  id: 'open_proposals',
  Renderer: OpenProposalsProposalLine,
  useData: () => {
    const refreshGovProposals = useRefreshGovProposals()
    const setRefreshOpenProposals = useSetRecoilState(refreshOpenProposalsAtom)
    const refresh = useCallback(() => {
      refreshGovProposals()
      setRefreshOpenProposals((id) => id + 1)
    }, [refreshGovProposals, setRefreshOpenProposals])

    const { profile, chains } = useProfile()

    const daosWithItemsLoadable = useCachedLoadable(
      profile.loading || chains.loading
        ? undefined
        : profile.data.uuid
          ? feedOpenProposalsSelector({
              uuid: profile.data.uuid,
              profileAddresses: chains.data.map(({ chainId, address }) => ({
                chainId,
                address,
              })),
            })
          : constSelector([])
    )

    const { following } = useFollowingDaos()

    // Refresh when any proposal or vote is updated for any of the followed
    // DAOs.
    useOnWebSocketMessage(
      !following.loading && !following.errored
        ? following.data.map(({ chainId, coreAddress }) =>
            webSocketChannelNameForDao({
              chainId,
              coreAddress,
            })
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
          ? daosWithItemsLoadable.contents
          : [],
      refresh,
    }
  },
}
