import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshOpenProposalsAtom } from '@dao-dao/state/recoil'
import { FeedSource } from '@dao-dao/types'
import { webSocketChannelNameForDao } from '@dao-dao/utils'

import {
  useFollowingDaos,
  useOnWebSocketMessage,
  useProfile,
  useQueryLoadingDataWithError,
  useRefreshGovProposals,
} from '../../../hooks'
import { OpenProposalsProposalLine } from './OpenProposalsProposalLineProps'
import { feedOpenProposalsQueries } from './state'
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

    const { connected, profile, chains } = useProfile()
    const { following } = useFollowingDaos()

    const daosWithItems = useQueryLoadingDataWithError(
      !profile.loading && !chains.loading
        ? feedOpenProposalsQueries.openProposals({
            uuid: profile.data.uuid,
            profileAddresses: chains.data.map(({ chainId, address }) => ({
              chainId,
              address,
            })),
          })
        : undefined
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
