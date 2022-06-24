import { WalletClient } from '@noahsaso/cosmodal'
import { atom } from 'recoil'

import { localStorageEffectJSON } from '../effects'

export const connectedWalletIdKey = 'connectedWalletId'
export const connectedWalletIdAtom = atom<string | null>({
  key: connectedWalletIdKey,
  default: null,
  effects: [localStorageEffectJSON(connectedWalletIdKey)],
})

export const walletClientAtom = atom<WalletClient | undefined>({
  key: 'walletClient',
  default: undefined,
  dangerouslyAllowMutability: true,
})
