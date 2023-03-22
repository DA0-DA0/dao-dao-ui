import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshOpenProposalsAtom } from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
import { InboxSource } from '@dao-dao/types'
import { webSocketChannelNameForDao } from '@dao-dao/utils'

import {
  ProposalLine,
  ProposalLineProps,
} from '../../../components/ProposalLine'
import { useOnWebSocketMessage } from '../../../hooks'
import { inboxOpenProposalsSelector } from './state'

export const OpenProposals: InboxSource<ProposalLineProps> = {
  id: 'open_proposals',
  Renderer: ProposalLine,
  useData: () => {
    const {
      address: walletAddress,
      status: walletConnectionStatus,
      chainInfo,
    } = useWallet()

    const setRefresh = useSetRecoilState(refreshOpenProposalsAtom)
    const refresh = useCallback(() => setRefresh((id) => id + 1), [setRefresh])

    const daosWithItemsLoadable = useCachedLoadable(
      // Don't load without a wallet until we're no longer initializing. This
      // prevents duplicate queries when the page is first loading.
      walletConnectionStatus === WalletConnectionStatus.Initializing ||
        walletConnectionStatus ===
          WalletConnectionStatus.AttemptingAutoConnection
        ? undefined
        : inboxOpenProposalsSelector({
            walletAddress,
          })
    )

    // Refresh when any proposal or vote is updated for any of the DAOs. Once
    // the wallet votes, the item is no longer pending, so the inbox pending
    // count needs to be updated.
    useOnWebSocketMessage(
      daosWithItemsLoadable.state === 'hasValue' && chainInfo
        ? daosWithItemsLoadable.contents.map(({ coreAddress }) =>
            webSocketChannelNameForDao({
              coreAddress,
              chainId: chainInfo.chainId,
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
