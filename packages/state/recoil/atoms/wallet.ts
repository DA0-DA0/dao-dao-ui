import { Keplr } from '@keplr-wallet/types'
import { KeplrWalletConnectV1 } from 'cosmodal'
import { atom } from 'recoil'

import { localStorageEffectJSON } from '../effects'

export const connectedWalletIdKey = 'connectedWalletId'
export const connectedWalletIdAtom = atom<string | null>({
  key: connectedWalletIdKey,
  default: null,
  effects: [localStorageEffectJSON(connectedWalletIdKey)],
})

export const walletConnectionIdAtom = atom({
  key: 'walletConnectionId',
  default: 0,
})

export const walletClientAtom = atom<Keplr | KeplrWalletConnectV1 | undefined>({
  key: 'walletClient',
  default: undefined,
  dangerouslyAllowMutability: true,
})
