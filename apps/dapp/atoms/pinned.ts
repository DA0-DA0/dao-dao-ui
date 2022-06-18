import { atom } from 'recoil'

import { localStorageEffect } from '@/atoms'

export const pinnedAddressesAtom = atom<string[]>({
  key: 'pinnedAddresses',
  default: [],
  effects: [localStorageEffect('pinnedAddresses')],
})

// When marking a proposal as done, either by voting on it or manually
// pressing the done button in the open list, add to this list so it gets
// ignored when fetching the open proposals.
// Map DAO core address to list of done proposal IDs.
export const pinnedProposalIDsMarkedDoneAtom = atom<
  Record<string, number[] | undefined>
>({
  key: 'pinnedProposalIDsMarkedDone',
  default: {},
  effects: [localStorageEffect('pinnedProposalIDsMarkedDone')],
})

// Map DAO core address to most recent proposal ID to NOT display on the
// homepage, for caching purposes. No need to load all proposals every time
// once all proposals before a certain point are marked done.
export const pinnedLatestProposalIDsMarkedDoneAtom = atom<
  Record<string, number | undefined>
>({
  key: 'pinnedLatestProposalIDsMarkedDone',
  default: {},
  effects: [localStorageEffect('pinnedLatestProposalIDsMarkedDone')],
})
