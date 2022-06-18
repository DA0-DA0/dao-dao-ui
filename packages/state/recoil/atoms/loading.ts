import { atom } from 'recoil'

export const stakingLoadingAtom = atom<boolean>({
  key: 'stakingLoading',
  default: false,
})
