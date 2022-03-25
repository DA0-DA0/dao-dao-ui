import { atom } from 'recoil'

// The expanded state of the sidebar.
export const sidebarExpandedAtom = atom<boolean>({
  key: 'sidebarExpandedAtom',
  default: true,
})
