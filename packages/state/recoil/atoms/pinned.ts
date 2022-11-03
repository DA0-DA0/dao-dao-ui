import { atom } from 'recoil'

import { localStorageEffectJSON } from '../effects'

// TODO(multichain): Store pinned addresses with their chain ID in one list.
export const pinnedAddressesAtom = atom<string[]>({
  key: 'pinnedAddresses',
  default: [],
  effects: [localStorageEffectJSON],
})
