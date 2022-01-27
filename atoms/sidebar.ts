import { atom, atomFamily } from 'recoil'

export const sidebarExpandedAtom = atom<boolean>({
  key: 'sidebarExpandedAtom',
  default: true,
})
