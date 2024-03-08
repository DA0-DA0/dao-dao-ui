import { atomFamily } from 'recoil'

import { AccountTxForm } from '@dao-dao/types'

import { localStorageEffectJSON } from '../effects'

/**
 * Store the current me transaction state by chain ID.
 */
export const meTransactionAtom = atomFamily<AccountTxForm, string>({
  key: 'meTransaction',
  default: {
    actions: [],
  },
  effects: [localStorageEffectJSON],
})
