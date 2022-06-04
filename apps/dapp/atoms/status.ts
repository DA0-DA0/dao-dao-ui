import { atom } from 'recoil'

import { localStorageEffect } from './localStorageEffect'

export const betaWarningAcceptedAtom = atom<boolean>({
  key: 'betaWarningAccepted',
  default: false,
  effects: [localStorageEffect<boolean>('betaWarningAccepted')],
})

export const installWarningVisibleAtom = atom<boolean>({
  key: 'installWarningVisible',
  default: false,
})

export const noKeplrAccountAtom = atom<boolean>({
  key: 'noKeplrAccountAtom',
  default: false,
})
