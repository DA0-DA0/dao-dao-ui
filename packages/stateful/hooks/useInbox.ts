import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshOpenProposalsAtom } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { UseInboxReturn } from '@dao-dao/types'

import { pinnedDaosWithOpenUnvotedProposalsSelector } from '../recoil'

export const useInbox = (): UseInboxReturn => {
  const { address: walletAddress, status: walletConnectionStatus } = useWallet()

  const daosWithOpenUnvotedProposalsLoadable = useCachedLoadable(
    // Don't load without a wallet until we're no longer initializing. This
    // prevents duplicate queries when the page is first loading.
    walletConnectionStatus === WalletConnectionStatus.Initializing ||
      walletConnectionStatus === WalletConnectionStatus.AttemptingAutoConnection
      ? undefined
      : pinnedDaosWithOpenUnvotedProposalsSelector({
          walletAddress,
        })
  )

  const setRefreshOpenProposals = useSetRecoilState(refreshOpenProposalsAtom)
  const refreshOpenProposals = useCallback(
    () => setRefreshOpenProposals((id) => id + 1),
    [setRefreshOpenProposals]
  )

  // Automatically update once per minute.
  useEffect(() => {
    const interval = setInterval(refreshOpenProposals, 60 * 1000)
    return () => clearInterval(interval)
  }, [refreshOpenProposals])

  const proposalCount =
    daosWithOpenUnvotedProposalsLoadable.state === 'hasValue'
      ? daosWithOpenUnvotedProposalsLoadable.contents.reduce(
          (acc, { openUnvotedProposals }) =>
            acc + (openUnvotedProposals?.length ?? 0),
          0
        )
      : 0

  return {
    loading: daosWithOpenUnvotedProposalsLoadable.state === 'loading',
    refetching:
      daosWithOpenUnvotedProposalsLoadable.state === 'hasValue' &&
      daosWithOpenUnvotedProposalsLoadable.updating,
    daosWithOpenUnvotedProposals:
      daosWithOpenUnvotedProposalsLoadable.state === 'hasValue'
        ? daosWithOpenUnvotedProposalsLoadable.contents
        : [],
    proposalCount,
    refetch: refreshOpenProposals,
  }
}
