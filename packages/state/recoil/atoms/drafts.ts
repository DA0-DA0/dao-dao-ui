import { AtomEffect, atom, atomFamily } from 'recoil'

import { FormProposalData } from '@dao-dao/actions'

import { localStorageEffectJSON } from '../effects'

export interface LocalFormProposalData extends FormProposalData {
  daoAddress: string
}
export interface NavDraft {
  address: string
  id: string
}

export const draftsRemoveLocalStorageEffect: AtomEffect<NavDraft[]> = ({
  onSet,
  node: _,
}) => {
  // Do nothing on server.
  if (typeof localStorage === 'undefined') {
    return
  }

  onSet((newValue: NavDraft[], oldValue: NavDraft[], _: boolean) => {
    const removedDrafts = oldValue.filter(
      (oldDraft) => !newValue.some(({ id }) => oldDraft.id === id)
    ) // warning: inefficient double loop here

    for (let { id } of removedDrafts) {
      localStorage.removeItem(`draft_${id}`)
    }
  })
}
export const activeDraftIdAtom = atom<string | undefined>({
  key: 'activeDraftId',
  default: undefined,
})

export const draftsAtom = atom<NavDraft[]>({
  key: 'drafts',
  default: [],
  effects: [
    draftsRemoveLocalStorageEffect,
    localStorageEffectJSON<NavDraft[]>('drafts'),
  ],
})

export const draftByIdAtom = atomFamily<
  LocalFormProposalData | undefined,
  string | undefined
>({
  key: 'draftById',
  default: undefined,
  effects: (draftId) =>
    draftId && draftId.length > 0
      ? [localStorageEffectJSON<LocalFormProposalData>(`draft_${draftId}`)]
      : [],
})

export const draftAtom = atomFamily<LocalFormProposalData, string>({
  key: 'draftById',
  default: undefined,
  effects: (draftId) =>
    draftId && draftId.length > 0
      ? [localStorageEffectJSON<LocalFormProposalData>(`draft_${draftId}`)]
      : [],
})
