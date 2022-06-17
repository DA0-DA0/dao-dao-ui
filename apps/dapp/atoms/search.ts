import { atom } from 'recoil'

export const searchVisibleAtom = atom<boolean>({
  key: 'searchVisible',
  default: false,
})
