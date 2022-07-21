import { selector } from 'recoil'

import {
  LocalFormProposalData,
  activeDraftIdAtom,
  draftAtom,
  draftByIdAtom,
  draftsAtom,
} from '../atoms/drafts'
import { configSelector } from './clients/cw-core'

export interface INavDrafts {
  label: string
  title: string
  id: string
  address: string
}
export const navDraftsSelector = selector<INavDrafts[]>({
  key: 'navDraftsSelector',
  get: ({ get }) => {
    const draftIds = get(draftsAtom)
    const drafts = draftIds.map(({ address, id }) => {
      const daoConfig = get(configSelector({ contractAddress: address }))
      const draft = get(draftAtom(id))
      return {
        label: daoConfig?.name || '',
        title: draft?.title || '',
        id,
        address,
      }
    })

    return drafts
  },
})

export const activeDraftSelector = selector<LocalFormProposalData | undefined>({
  key: 'activeDraftSelector',
  get: ({ get }) => {
    const draftId = get(activeDraftIdAtom)
    const draft = get(draftByIdAtom(draftId))

    return draft
  },
  set: ({ set, get }, newValue) => {
    const draftId = get(activeDraftIdAtom)
    console.log('set activeDraftSelector', draftId)
    set(draftByIdAtom(draftId), newValue)
  },
})
