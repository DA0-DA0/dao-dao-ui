import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { useCachedLoadable } from '@dao-dao/stateless'
import { InboxSource } from '@dao-dao/types'

import {
  ProposalLine,
  ProposalLineProps,
} from '../../../components/ProposalLine'
import {
  inboxOpenProposalsSelector,
  refreshInboxOpenProposalsAtom,
} from './state'

export const OpenProposals: InboxSource<ProposalLineProps> = {
  id: 'open_proposals',
  Renderer: ProposalLine,
  useData: () => {
    const { address: walletAddress, status: walletConnectionStatus } =
      useWallet()

    const setRefresh = useSetRecoilState(refreshInboxOpenProposalsAtom)
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
