import { atom } from 'recoil'

export const stakingLoadingAtom = atom<boolean>({
  key: 'stakingLoading',
  default: false,
})

// Used as a global indication we are navigating. Make sure to clear this once
// navigation completes.
export const navigatingToPageAtom = atom<string | undefined>({
  key: 'navigatingToPage',
  default: undefined,
})
