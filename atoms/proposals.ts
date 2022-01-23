import { Proposal, ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import { MessageMapEntry } from 'models/proposal/messageMap'
import { atom, atomFamily, selectorFamily, AtomEffect } from 'recoil'
import {
  ContractProposalMap,
  ProposalKey,
  ProposalMessageKey,
  ProposalMap,
  ProposalMapItem,
  ExtendedProposalResponse,
} from 'types/proposals'

export function draftProposalItem(
  proposal: Proposal,
  id: string
): ProposalMapItem {
  return {
    proposal,
    id,
    draft: true,
  }
}

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet, node }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      const json = JSON.parse(savedValue)
      setSelf(json)
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

export const proposalsRequestIdAtom = atom<number>({
  key: 'proposalsRequestId',
  default: 0,
})

export const proposalsRequestStartBeforeAtom = atom<number>({
  key: 'proposalsRequestStartBefore',
  default: 0,
})

export const proposalListAtom = atomFamily<ExtendedProposalResponse[], string>({
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

export const nextDraftProposalIdAtom = atom<number>({
  key: 'nextDraftProposalId',
  default: 10000,
  effects_UNSTABLE: [localStorageEffect<number>('nextDraftProposalId')],
})

export const contractProposalMapAtom = atom<ContractProposalMap>({
  key: 'contractProposalMap',
  default: {},
  effects_UNSTABLE: [
    localStorageEffect<ContractProposalMap>('contractProposalMap'),
  ],
})
