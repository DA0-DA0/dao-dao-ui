import { atom, atomFamily } from 'recoil'

import { ProposalResponse } from '@dao-dao/state/clients/cw-proposal-single'

// By depending on this atom, the selector for retrieving the list
// of on-chain proposals can know when it's time to actually re-calculate
// and go refetch the data from the chain (even if the selector params
// haven't changed). Set when performing mutations like updating the
// votes or status on a proposal.
export const proposalsRequestIdAtom = atom<number>({
  key: 'proposalsRequestId',
  default: 0,
})

// High-water mark for where to start querying the chain for proposals.
// Used when paging in "more items" in proposal list pages.
export const proposalsRequestStartAfterAtom = atom<number>({
  key: 'proposalsRequestStartAfter',
  default: 0,
})

// The loaded list of proposals.
export const proposalListAtom = atomFamily<ProposalResponse[], string>({
  key: 'proposalList',
  default: [],
})

// The number of proposals that have been created since we updated the
// proposal listing.
export const proposalsCreatedAtom = atomFamily<number, string>({
  key: 'proposalsCreatedAtom',
  default: 0,
})

// Indicates how many times a given proposal has been updated via the
// UI. For example, voting on a proposal ought to increment the update
// count for the proposal.
//
// This is used by proposal selectors so that they might update when a
// UI action triggers the database to change.
export const proposalUpdateCountAtom = atomFamily<
  number,
  { contractAddress: string; proposalId: number }
>({
  key: 'proposalUpdateCountAtom',
  default: 0,
})

// A list of the proposals that have been updated and have not had their update
// reflected in the proposal list view for a given contract.
export const proposalsUpdated = atomFamily<number[], string>({
  key: 'proposalsUpdatedAtom',
  default: [],
})
