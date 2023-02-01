// Store each subDAO creation state separately. Main DAO creation state uses an

import { atom, atomFamily } from 'recoil'

import { MeTransactionForm, MeTransactionSave } from '@dao-dao/types'

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

export const meTransactionSavesAtom = atomFamily<
  MeTransactionSave[] | undefined,
  string
>({
  key: 'meTransactionSaves',
  default: undefined,
})
