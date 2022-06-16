import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import {
  pinnedAddressesAtom,
  pinnedLatestProposalIDsMarkedDoneAtom,
  pinnedProposalIDsMarkedDoneAtom,
} from '@/atoms'

// There are three important pieces of state:

// pinnedAddresses is straightforward: it's just a list of cw-core
// addresses that have been pinned/favorited.

// pinnedProposalIDsMarkedDone is a map of cw-core address to a list of
// proposal IDs, which contains the IDs of proposals that have been marked
// done. This happens when a user clicks the hide button on a proposal on
// the top of the starred/home page, or when a user casts a vote.

// pinnedLatestProposalIDsMarkedDone is a map of cw-core address to one
// proposal ID. This is a cache of the latest proposal ID that has been
// marked as done, allowing the done list above to stay relatively short
// and not waste the user's browser storage. This also allows us to more
// efficiently query for the list of all proposals by using the startAfter
// parameter. If the first 5 proposals are not open on the first load, the
// home page detects that the first loaded open proposal was #6, and sets
// the value in this map to 5. The next time the user loads the home page,
// it will use startAfter:5 when querying the list of proposals. This also
// takes into account the manual done list. Since the proposals in the done
// list will be manually filtered out of the query response, this map gets
// updated to reflect the latest proposal ID that was marked done based on
// the proposals that get displayed, which then allows us to clear the done
// list of all values smaller than this latest ID.
// Example:
// pinnedProposalIDsMarkedDone: a -> [2, 4]
// pinnedLatestProposalIDsMarkedDone: a -> 1
// Upon marking proposal #3 as done, but not before, this should update to:
// pinnedProposalIDsMarkedDone: a -> []
// pinnedLatestProposalIDsMarkedDone: a -> 4
// and #5 will be the first one loaded next time without having to manually
// filter out 2 and 4 like before, and keeping the localStorage size down.

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
