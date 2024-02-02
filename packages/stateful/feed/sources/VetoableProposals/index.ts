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

import { useOnWebSocketMessage, useSupportedChainWallets } from '../../../hooks'
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

    const supportedChainWallets = useSupportedChainWallets().filter(
      ({ chainWallet: { chain } }) =>
        !filter?.chainId || chain.chain_id === filter.chainId
    )

    const daosWithItemsLoadable = useCachedLoadable(
      supportedChainWallets.every(({ hexPublicKey }) => hexPublicKey)
        ? waitForAll(
            supportedChainWallets.flatMap(
              ({ chainWallet: { chain }, hexPublicKey }) =>
                hexPublicKey
                  ? feedVetoableProposalsSelector({
                      chainId: chain.chain_id,
                      hexPublicKey,
                    })
                  : []
            )
          )
        : undefined
    )

    const followingDaosLoadable = useRecoilValueLoadable(
      supportedChainWallets.every(({ hexPublicKey }) => hexPublicKey)
        ? waitForAll(
            supportedChainWallets.flatMap(
              ({ chainWallet: { chain }, hexPublicKey }) =>
                hexPublicKey
                  ? followingDaosSelector({
                      chainId: chain.chain_id,
                      walletPublicKey: hexPublicKey,
                    })
                  : []
            )
          )
        : constSelector([])
    )

    // Refresh when any proposal or vote is updated for any of the followed
    // DAOs.
    useOnWebSocketMessage(
      followingDaosLoadable.state === 'hasValue'
        ? supportedChainWallets.flatMap(
            ({ chainWallet: { chain } }, index) =>
              followingDaosLoadable.contents[index]?.map((coreAddress) =>
                webSocketChannelNameForDao({
                  coreAddress,
                  chainId: chain.chain_id,
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
