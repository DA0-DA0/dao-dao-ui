import { atom } from 'recoil'

import { Web3AuthPrompt } from '@dao-dao/types'

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

export const updateProfileNftVisibleAtom = atom<boolean>({
  key: 'updateProfileNftVisible',
  default: false,
})

export const mergeProfilesVisibleAtom = atom<boolean>({
  key: 'mergeProfilesVisible',
  default: false,
})

export const web3AuthPromptAtom = atom<Web3AuthPrompt | undefined>({
  key: 'web3AuthPrompt',
  default: undefined,
})

// Whether or not we are running in the Keplr Mobile in-app browser.
export const isKeplrMobileWebAtom = atom({
  key: 'isKeplrMobileWeb',
  default: false,
})

export const indexerWebSocketChannelSubscriptionsAtom = atom<
  Partial<Record<string, number>>
>({
  key: 'indexerWebSocketChannelSubscriptions',
  default: {},
})
