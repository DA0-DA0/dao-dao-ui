import { selector } from 'recoil'

import { draftAtom, draftsAtom } from '../atoms/drafts'
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
    console.log('draftszz', drafts)

    return drafts
  },
})
