import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import {
  pinnedAddressesAtom,
  pinnedLatestProposalsMarkedDoneAtom,
  pinnedProposalsMarkedDoneAtom,
} from '@/atoms'

// There are three important pieces of state:

// pinnedAddresses is straightforward: it's just a list of cw-core
// addresses that have been pinned.

// pinnedProposalsMarkedDone is a map of cw-core address to a map of proposal
// module address to a list of proposal IDs, which contains the IDs of proposals
// that have been marked done. This happens when a user clicks the hide button
// on a proposal on the top of the homepage.

// pinnedLatestProposalsMarkedDone is a map of cw-core address to a map of
// proposal module address to one proposal ID. This is a cache of the latest
// proposal ID that has been marked as done for the given proposal module
// address, allowing the done list above to stay relatively short and not waste
// the user's browser storage. This also allows us to more efficiently query for
// the list of all proposals by using the startAfter parameter. If the first 5
// proposals are not open on the first load, the home page detects that the
// first loaded open proposal was #6, and sets the value in this map to 5. The
// next time the user loads the home page, it will use startAfter:5 when
// querying the list of proposals. This also takes into account the manual done
// list. Since the proposals in the done list will be manually filtered out of
// the query response, this map gets updated to reflect the latest proposal ID
// that was marked done based on the proposals that get displayed, which then
// allows us to clear the done list of all values smaller than this latest ID.
// Example:
// pinnedProposalsMarkedDone: core -> (a -> [2, 4])
// pinnedLatestProposalsMarkedDone: core -> (a -> 1)
// Upon marking proposal #3 as done, but not before, this should update to:
// pinnedProposalsMarkedDone: core -> (a -> [])
// pinnedLatestProposalsMarkedDone: core -> (a -> 4)
// and #5 will be the first one loaded next time without having to manually
// filter out 2 and 4 like before, while keeping the localStorage size down.

export const usePinnedDAOs = () => {
  const [pinnedAddresses, setPinnedAddresses] =
    useRecoilState(pinnedAddressesAtom)
  const [pinnedProposalsMarkedDone, setPinnedProposalsMarkedDone] =
    useRecoilState(pinnedProposalsMarkedDoneAtom)
  const [pinnedLatestProposalsMarkedDone, setPinnedLatestProposalsMarkedDone] =
    useRecoilState(pinnedLatestProposalsMarkedDoneAtom)

  const isPinned = useCallback(
    (coreAddress: string) => pinnedAddresses.includes(coreAddress),
    [pinnedAddresses]
  )
  const setPinned = useCallback(
    (
      coreAddress: string,
      mostRecentProposalIds?: Record<string, number | undefined>
    ) => {
      setPinnedAddresses((pinned) => pinned.concat([coreAddress]))
      // Initialize empty.
      setPinnedProposalsMarkedDone((curr) => ({
        ...curr,
        [coreAddress]: {},
      }))

      if (mostRecentProposalIds) {
        // Initialize with latest proposal IDs if provided so we don't load
        // proposals created before they pinned the DAO.
        setPinnedLatestProposalsMarkedDone((curr) => ({
          ...curr,
          [coreAddress]: mostRecentProposalIds,
        }))
      }
    },
    [
      setPinnedAddresses,
      setPinnedLatestProposalsMarkedDone,
      setPinnedProposalsMarkedDone,
    ]
  )
  const setUnpinned = useCallback(
    (coreAddress: string) => {
      setPinnedAddresses((pinned) => pinned.filter((a) => a !== coreAddress))
      // Remove proposals marked done.
      setPinnedProposalsMarkedDone((curr) =>
        Object.keys(curr).reduce(
          (acc, key) => ({
            ...acc,
            ...(key !== coreAddress ? { [key]: curr[key] } : {}),
          }),
          {}
        )
      )
      setPinnedLatestProposalsMarkedDone((curr) =>
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
      setPinnedLatestProposalsMarkedDone,
      setPinnedProposalsMarkedDone,
    ]
  )

  const isProposalMarkedDone = useCallback(
    (
      coreAddress: string,
      proposalModuleAddress: string,
      proposalNumber: number
    ) =>
      pinnedProposalsMarkedDone[coreAddress]?.[proposalModuleAddress]?.includes(
        proposalNumber
      ) ?? false,
    [pinnedProposalsMarkedDone]
  )
  const getLatestPinnedProposalNumberMarkedDone = useCallback(
    (coreAddress: string, proposalModuleAddress: string) =>
      pinnedLatestProposalsMarkedDone[coreAddress]?.[proposalModuleAddress],
    [pinnedLatestProposalsMarkedDone]
  )
  const markPinnedProposalDone = useCallback(
    (
      coreAddress: string,
      proposalModuleAddress: string,
      proposalNumber: number
    ) => {
      // Don't need to save proposal ID if DAO is not pinned.
      if (!isPinned(coreAddress)) {
        return
      }

      // Mark done, avoiding duplicates.
      const newDone = (
        pinnedProposalsMarkedDone[coreAddress]?.[proposalModuleAddress] ?? []
      ).concat(
        pinnedProposalsMarkedDone[coreAddress]?.[
          proposalModuleAddress
        ]?.includes(proposalNumber)
          ? []
          : [proposalNumber]
      )
      // Update latest to be the most recent consecutive marked done.
      // For example, if the current latest is 2 and marked done is
      // [3, 5], and then we mark 4 done, then the latest should be 5 since
      // everything from 2 to 5 is now marked done.
      const allMarkedDone = newDone
        .concat(
          getLatestPinnedProposalNumberMarkedDone(
            coreAddress,
            proposalModuleAddress
          ) ?? []
        )
        .sort((a, b) => a - b)
      const newLatest = allMarkedDone.reduce(
        (acc, curr) => (acc === curr || acc === curr - 1 ? curr : acc),
        allMarkedDone[0]
      )

      setPinnedProposalsMarkedDone((curr) => ({
        ...curr,
        [coreAddress]: {
          ...curr[coreAddress],
          [proposalModuleAddress]: newDone.filter((id) => id > newLatest),
        },
      }))
      setPinnedLatestProposalsMarkedDone((curr) => ({
        ...curr,
        [coreAddress]: {
          ...curr[coreAddress],
          [proposalModuleAddress]: newLatest,
        },
      }))
    },
    [
      isPinned,
      pinnedProposalsMarkedDone,
      getLatestPinnedProposalNumberMarkedDone,
      setPinnedProposalsMarkedDone,
      setPinnedLatestProposalsMarkedDone,
    ]
  )
  const cacheLatestProposalsMarkedDone = useCallback(
    (
      latestProposalIDsMarkedDone: Record<
        string,
        Record<string, number | undefined> | undefined
      >
    ) => {
      setPinnedLatestProposalsMarkedDone(latestProposalIDsMarkedDone)
      // Remove all proposal IDs marked done before the new latest.
      setPinnedProposalsMarkedDone((curr) =>
        Object.keys(latestProposalIDsMarkedDone).reduce(
          (acc, coreAddress) => ({
            ...acc,
            [coreAddress]: Object.keys(curr[coreAddress] ?? {}).reduce(
              (coreAcc, proposalModuleAddress) => ({
                ...coreAcc,
                [proposalModuleAddress]: (
                  curr[coreAddress]?.[proposalModuleAddress] ?? []
                ).filter(
                  (proposalId) =>
                    latestProposalIDsMarkedDone[coreAddress]?.[
                      proposalModuleAddress
                    ] === undefined ||
                    // Only keep proposal ID marked done if newer than cached.
                    proposalId >
                      latestProposalIDsMarkedDone[coreAddress]![
                        proposalModuleAddress
                      ]!
                ),
              }),
              {}
            ),
          }),
          {}
        )
      )
    },
    [setPinnedLatestProposalsMarkedDone, setPinnedProposalsMarkedDone]
  )

  return {
    pinnedAddresses,
    // Helpers
    isPinned,
    setPinned,
    setUnpinned,
    isProposalMarkedDone,
    getLatestPinnedProposalNumberMarkedDone,
    markPinnedProposalDone,
    cacheLatestProposalsMarkedDone,
    pinnedLatestProposalsMarkedDone,
  }
}
