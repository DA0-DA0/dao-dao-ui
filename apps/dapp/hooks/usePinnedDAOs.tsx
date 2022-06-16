import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import {
  pinnedAddressesAtom,
  pinnedLatestProposalIDsMarkedDoneAtom,
  pinnedProposalIDsMarkedDoneAtom,
} from '@/atoms'

export const usePinnedDAOs = () => {
  const [pinnedAddresses, setPinnedAddresses] =
    useRecoilState(pinnedAddressesAtom)
  const [pinnedProposalIDsMarkedDone, setPinnedProposalIDsMarkedDone] =
    useRecoilState(pinnedProposalIDsMarkedDoneAtom)
  const [
    pinnedLatestProposalIDsMarkedDone,
    setPinnedLatestProposalIDsMarkedDone,
  ] = useRecoilState(pinnedLatestProposalIDsMarkedDoneAtom)

  const isPinned = useCallback(
    (coreAddress: string) => pinnedAddresses.includes(coreAddress),
    [pinnedAddresses]
  )
  const setPinned = useCallback(
    (coreAddress: string, mostRecentProposalId?: number) => {
      setPinnedAddresses((pinned) => pinned.concat([coreAddress]))
      if (mostRecentProposalId !== undefined) {
        // Initialize empty since the latest map below will cache the
        // latest proposal ID marked done and ignore everything before.
        setPinnedProposalIDsMarkedDone((curr) => ({
          ...curr,
          [coreAddress]: [],
        }))
        // Initialize with latest proposal ID if provided so we don't load
        // proposals created before they pinned the DAO.
        setPinnedLatestProposalIDsMarkedDone((curr) => ({
          ...curr,
          [coreAddress]: mostRecentProposalId,
        }))
      }
    },
    [
      setPinnedAddresses,
      setPinnedLatestProposalIDsMarkedDone,
      setPinnedProposalIDsMarkedDone,
    ]
  )
  const setUnpinned = useCallback(
    (coreAddress: string) => {
      setPinnedAddresses((pinned) => pinned.filter((a) => a !== coreAddress))
      // Remove proposals marked done.
      setPinnedProposalIDsMarkedDone((curr) =>
        Object.keys(curr).reduce(
          (acc, key) => ({
            ...acc,
            ...(key !== coreAddress ? { [key]: curr[key] } : {}),
          }),
          {}
        )
      )
      setPinnedLatestProposalIDsMarkedDone((curr) =>
        Object.keys(curr).reduce(
          (acc, key) => ({
            ...acc,
            ...(key !== coreAddress ? { [key]: curr[key] } : {}),
          }),
          {}
        )
      )
    },
    [
      setPinnedAddresses,
      setPinnedLatestProposalIDsMarkedDone,
      setPinnedProposalIDsMarkedDone,
    ]
  )

  const isProposalIdMarkedDone = useCallback(
    (coreAddress: string, proposalId: number) =>
      pinnedProposalIDsMarkedDone[coreAddress]?.includes(proposalId) ?? false,
    [pinnedProposalIDsMarkedDone]
  )
  const getLatestPinnedProposalIdMarkedDone = useCallback(
    (coreAddress: string) => pinnedLatestProposalIDsMarkedDone[coreAddress],
    [pinnedLatestProposalIDsMarkedDone]
  )
  const markPinnedProposalIdDone = useCallback(
    (coreAddress: string, proposalId: number) => {
      // Don't need to save proposal ID if DAO is not pinned.
      if (!isPinned(coreAddress)) {
        return
      }

      // Mark done, avoiding duplicates.
      const newDone = (pinnedProposalIDsMarkedDone[coreAddress] ?? []).concat(
        pinnedProposalIDsMarkedDone[coreAddress]?.includes(proposalId)
          ? []
          : [proposalId]
      )
      // Update latest to be the most recent consecutive marked done.
      // For example, if the current latest is 2 and marked done is
      // [3, 5], and then we mark 4 done, then the latest should be 5 since
      // everything from 2 to 5 is now marked done.
      const allMarkedDone = newDone
        .concat(getLatestPinnedProposalIdMarkedDone(coreAddress) ?? [])
        .sort()
      const newLatest = allMarkedDone.reduce(
        (acc, curr) => (acc === curr || acc === curr - 1 ? curr : acc),
        allMarkedDone[0]
      )

      setPinnedProposalIDsMarkedDone((curr) => ({
        ...curr,
        [coreAddress]: newDone.filter((id) => id > newLatest),
      }))
      setPinnedLatestProposalIDsMarkedDone((curr) => ({
        ...curr,
        [coreAddress]: newLatest,
      }))
    },
    [
      isPinned,
      pinnedProposalIDsMarkedDone,
      getLatestPinnedProposalIdMarkedDone,
      setPinnedProposalIDsMarkedDone,
      setPinnedLatestProposalIDsMarkedDone,
    ]
  )
  const cacheLatestProposalIDsMarkedDone = useCallback(
    (latestProposalIDsMarkedDone: Record<string, number | undefined>) => {
      setPinnedLatestProposalIDsMarkedDone(latestProposalIDsMarkedDone)
      // Remove all proposal IDs marked done before the new latest.
      setPinnedProposalIDsMarkedDone((curr) =>
        Object.keys(latestProposalIDsMarkedDone).reduce(
          (acc, coreAddress) => ({
            ...acc,
            [coreAddress]: (curr[coreAddress] ?? []).filter(
              (proposalId) =>
                latestProposalIDsMarkedDone[coreAddress] === undefined ||
                // Only keep proposal ID marked done if newer than cached.
                proposalId > latestProposalIDsMarkedDone[coreAddress]!
            ),
          }),
          {}
        )
      )
    },
    [setPinnedLatestProposalIDsMarkedDone, setPinnedProposalIDsMarkedDone]
  )

  return {
    pinnedAddresses,
    // Helpers
    isPinned,
    setPinned,
    setUnpinned,
    isProposalIdMarkedDone,
    getLatestPinnedProposalIdMarkedDone,
    markPinnedProposalIdDone,
    cacheLatestProposalIDsMarkedDone,
  }
}
