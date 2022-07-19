import { atom, atomFamily } from 'recoil'

import { FormProposalData } from '@dao-dao/actions'

import { localStorageEffect } from './localStorageEffect'

interface LocalFormProposalData extends FormProposalData {
  daoAddress: string
}
export interface NavDraft {
  address: string
  id: string
}

export const activeDraftIdAtom = atom<string | undefined>({
  key: 'activeDraftId',
  default: undefined,
})

export const draftsAtom = atom<NavDraft[]>({
  key: 'drafts',
  default: [],
  effects: [localStorageEffect<NavDraft[]>('drafts')],
})

export const draftAtom = atomFamily<LocalFormProposalData, string>({
  key: 'draftById',
  default: undefined,
  effects: (draftId) =>
    draftId && draftId.length > 0
      ? [localStorageEffect<LocalFormProposalData>(`draft_${draftId}`)]
      : [],
})
