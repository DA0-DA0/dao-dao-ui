import { atom, atomFamily } from 'recoil'

import { ProposalDraft } from '@dao-dao/types'
import { ProposalCreatedCardProps } from '@dao-dao/types/proposal'

import { localStorageEffectJSON } from '../effects'

// Store proposal ID list endings for proposal pagination for the given
// coreAddress. Map list index to its ending for each proposal module address.
export const proposalStartBeforesAtom = atomFamily<
  Record<number, Record<string, number | undefined> | undefined>,
  string
>({
  key: 'proposalStartBefores',
  // Start first list (index 0) at the beginning.
  // It uses the previous list's ending as its starting point, so
  // set index -1 to undefined so startBefore is initially undefined.
  default: { [-1]: undefined },
})

// Count of proposal lists that have been loaded for the given coreAddress. Each
// 'load more' action increments this.
export const proposalListCountAtom = atomFamily<number, string>({
  key: 'proposalListCount',
  default: 1,
})

// Store proposal drafts per DAO.
export const proposalDraftsAtom = atomFamily<ProposalDraft[], string>({
  key: 'proposalDrafts',
  default: [],
  effects: [localStorageEffectJSON],
})

// When set, shows proposal created modal with these props for the ProposalCard
// shown.
export const proposalCreatedCardPropsAtom = atom<
  ProposalCreatedCardProps | undefined
>({
  key: 'proposalCreatedCardProps',
  default: undefined,
})
