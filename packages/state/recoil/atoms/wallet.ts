import { Keplr } from '@keplr-wallet/types'
import { KeplrWalletConnectV1 } from 'cosmodal'
import { atom } from 'recoil'

import { localStorageEffectJSON } from '../effects'

export const walletConnectedKey = 'walletConnected'
export const walletConnectedAtom = atom<string | null>({
  key: walletConnectedKey,
  default: null,
  effects: [localStorageEffectJSON(walletConnectedKey)],
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

export const walletConnectErrorAtom = atom<any>({
  key: 'walletConnectError',
  default: undefined,
})
