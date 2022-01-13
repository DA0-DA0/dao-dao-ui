import { ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import { atom, atomFamily } from 'recoil'

export const proposalsRequestIdAtom = atom<number>({
  key: 'proposalsRequestId',
  default: 0,
})

export const proposalsRequestStartBeforeAtom = atom<number>({
  key: 'proposalsRequestStartBefore',
  default: 0,
})

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
