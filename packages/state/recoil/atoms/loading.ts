import { atom } from 'recoil'

export const stakingLoadingAtom = atom<boolean>({
  key: 'stakingLoading',
  default: false,
})

// Used as a global indication we are navigating. Make sure to clear this once
// navigation completes.
export const navigatingToHrefAtom = atom<string | undefined>({
  key: 'navigatingToHref',
  default: undefined,
  effects: [
    ({ onSet, setSelf }) => {
      onSet((href) => {
        if (
          // Do not show loading when opening a remote URL.
          href?.startsWith('http') ||
          // Do not show loading for hashes.
          href === '#'
        ) {
          setSelf(undefined)
        }
      })
    },
  ],
})
