import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshOpenProposalsAtom } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { UseInboxReturn } from '@dao-dao/types'

import { pinnedDaosWithOpenProposalsSelector } from '../recoil'

export const useInbox = (): UseInboxReturn => {
  const { address: walletAddress, status: walletConnectionStatus } = useWallet()

  const daosWithOpenProposalsLoadable = useCachedLoadable(
    // Don't load without a wallet until we're no longer initializing. This
    // prevents duplicate queries when the page is first loading.
    walletConnectionStatus === WalletConnectionStatus.Initializing ||
      walletConnectionStatus === WalletConnectionStatus.AttemptingAutoConnection
      ? undefined
      : pinnedDaosWithOpenProposalsSelector({
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
    daosWithOpenProposalsLoadable.state === 'hasValue'
      ? daosWithOpenProposalsLoadable.contents.reduce(
          (acc, { openProposals: openUnvotedProposals }) =>
            acc + (openUnvotedProposals?.length ?? 0),
          0
        )
      : 0

  return {
    loading: daosWithOpenProposalsLoadable.state === 'loading',
    refetching:
      daosWithOpenProposalsLoadable.state === 'hasValue' &&
      daosWithOpenProposalsLoadable.updating,
    daosWithOpenProposals:
      daosWithOpenProposalsLoadable.state === 'hasValue'
        ? daosWithOpenProposalsLoadable.contents
        : [],
    proposalCount,
    refetch: refreshOpenProposals,
  }
}
