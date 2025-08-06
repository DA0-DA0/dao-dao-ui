import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshProposalsIdAtom } from '@dao-dao/state/recoil'
import {
  VetoableProposals as Renderer,
  VetoableProposalsProps,
} from '@dao-dao/stateless'
import { FeedSource, StatefulProposalLineProps } from '@dao-dao/types'
import { webSocketChannelNameForDao } from '@dao-dao/utils'

import {
  useFollowingDaos,
  useOnWebSocketMessage,
  useProfile,
  useQueryLoadingDataWithError,
} from '../../../hooks'
import { feedVetoableProposalsQueries } from './state'

export const VetoableProposals: FeedSource<
  VetoableProposalsProps<StatefulProposalLineProps>
> = {
  id: 'vetoable_proposals',
  Renderer,
  useData: () => {
    const setRefresh = useSetRecoilState(refreshProposalsIdAtom)
    const refresh = useCallback(() => setRefresh((id) => id + 1), [setRefresh])

    const { connected, profile } = useProfile()
    const { following } = useFollowingDaos()

    const daosWithItems = useQueryLoadingDataWithError(
      !profile.loading
        ? feedVetoableProposalsQueries.vetoableProposals({
            uuid: profile.data.uuid,
          })
        : undefined,
      (data) =>
        data.map((d) => ({
          ...d,
          items: d.items.map((i) => ({
            ...i,
            props: {
              ...i.props,
              className: 'mt-4 ml-4 first:mt-0',
            },
          })),
        }))
    )

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
      loading: daosWithItems.loading && connected,
      refreshing: !daosWithItems.loading && !!daosWithItems.updating,
      daosWithItems:
        daosWithItems.loading || daosWithItems.errored
          ? []
          : daosWithItems.data,
      refresh,
    }
  },
}
