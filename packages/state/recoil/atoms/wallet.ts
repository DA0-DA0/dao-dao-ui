// Store each subDAO creation state separately. Main DAO creation state uses an

import { atom } from 'recoil'

import { MeTransactionForm } from '@dao-dao/types'

import { localStorageEffectJSON } from '../effects'

// Save signed in wallet so its accessible by selectors.
export const walletAddressAtom = atom<string | undefined>({
  key: 'walletAddress',
  default: undefined,
})

export const meTransactionAtom = atom<MeTransactionForm>({
  key: 'meTransaction',
  default: {
    actions: [],
  },
  effects: [localStorageEffectJSON],
})
