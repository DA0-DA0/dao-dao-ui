import { atom } from 'recoil'

import { localStorageEffectJSON } from '../effects'

// Utility atom to store if the app is running in the browser
// (as opposed to being rendered on the server). The intended
// use is to set it to true immediately on _app mount (likely in a
// useEffect call) which marks one render cycle completing.
export const mountedInBrowserAtom = atom({
  key: 'inBrowser',
  default: false,
})

export const navigationCompactAtom = atom({
  key: 'navigationCompact',
  default: false,
  effects: [localStorageEffectJSON],
})

export const commandModalVisibleAtom = atom<boolean>({
  key: 'commandModalVisible',
  default: false,
})

export const betaWarningAcceptedAtom = atom<boolean>({
  key: 'betaWarningAccepted',
  default: false,
  effects: [localStorageEffectJSON],
})

export const installWarningVisibleAtom = atom<boolean>({
  key: 'installWarningVisible',
  default: false,
})

export const noKeplrAccountAtom = atom<boolean>({
  key: 'noKeplrAccountAtom',
  default: false,
})

// If true, will display wallet modal. The wallet modal will always be visible
// when connecting to a wallet. This atom is used to display the wallet modal
// when not actively connecting to a wallet, likely to display the connected
// wallet or switch to another one.
export const walletModalVisibleAtom = atom<boolean>({
  key: 'walletModalVisible',
  default: false,
})
