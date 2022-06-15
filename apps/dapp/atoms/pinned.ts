import { atom } from 'recoil'

import { localStorageEffect } from '@/atoms'

export const pinnedAddressesAtom = atom<string[]>({
  key: 'pinnedAddresses',
  default: [],
  effects: [localStorageEffect<string[]>('pinnedAddresses')],
})
