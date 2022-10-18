import { atom } from 'recoil'

import { localStorageEffectJSON } from '../effects'

export const pinnedAddressesAtom = atom<string[]>({
  key: 'pinnedAddresses',
  default: [],
  effects: [localStorageEffectJSON],
})
