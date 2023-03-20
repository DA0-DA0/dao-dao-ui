// Store each subDAO creation state separately. Main DAO creation state uses an

import { atom } from 'recoil'

import { MeTransactionForm } from '@dao-dao/types'

import { localStorageEffectJSON } from '../effects'

export const meTransactionAtom = atom<MeTransactionForm>({
  key: 'meTransaction',
  default: {
    actions: [],
  },
  effects: [localStorageEffectJSON],
})
