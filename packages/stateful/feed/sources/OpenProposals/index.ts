import { useCallback } from 'react'
import { constSelector, useSetRecoilState, waitForAll } from 'recoil'

import { refreshOpenProposalsAtom } from '@dao-dao/state/recoil'
import {
  useCachedLoadable,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { FeedSource } from '@dao-dao/types'
import { webSocketChannelNameForDao } from '@dao-dao/utils'

import { useOnWebSocketMessage, useProfile } from '../../../hooks'
import { followingDaosSelector } from '../../../recoil'
import { OpenProposalsProposalLine } from './OpenProposalsProposalLineProps'
import { feedOpenProposalsSelector } from './state'
import { OpenProposalsProposalLineProps } from './types'

export const OpenProposals: FeedSource<OpenProposalsProposalLineProps> = {
  id: 'open_proposals',
  Renderer: OpenProposalsProposalLine,
  useData: () => {
    const setRefresh = useSetRecoilState(refreshOpenProposalsAtom)
    const refresh = useCallback(() => setRefresh((id) => id + 1), [setRefresh])

    const { chains, uniquePublicKeys } = useProfile()

    const daosWithItemsLoadable = useCachedLoadable(
      uniquePublicKeys.loading || chains.loading
        ? undefined
        : uniquePublicKeys.data.length > 0
        ? feedOpenProposalsSelector({
            publicKeys: uniquePublicKeys.data.map(({ publicKey }) => publicKey),
            profileAddresses: chains.data.map(({ chainId, address }) => ({
              chainId,
              address,
            })),
          })
        : constSelector([])
    )

    const followingDaosLoadable = useCachedLoadingWithError(
      !uniquePublicKeys.loading
        ? waitForAll(
            uniquePublicKeys.data.map(({ publicKey }) =>
              followingDaosSelector({
                walletPublicKey: publicKey,
              })
            )
          )
        : undefined,
      (data) => data.flat()
    )

    // Refresh when any proposal or vote is updated for any of the followed
    // DAOs.
    useOnWebSocketMessage(
      !followingDaosLoadable.loading && !followingDaosLoadable.errored
        ? followingDaosLoadable.data.map(({ chainId, coreAddress }) =>
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
