import { atom } from 'recoil'

import { localStorageEffect } from './localStorageEffect'

export const loadingAtom = atom<boolean>({
  key: 'loading',
  default: false,
})

export const errorAtom = atom<any>({
  key: 'error',
  default: undefined,
})

export const transactionHashAtom = atom<string | undefined>({
  key: 'transactionHash',
  default: undefined,
})

export interface Status {
  status: 'success' | 'error' | 'info'
  title: string
  message?: string
}

export const activeStatusAtom = atom<Status | undefined>({
  key: 'activeStatus',
  default: undefined,
})

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

export const stakingLoadingAtom = atom<boolean>({
  key: 'stakingLoading',
  default: false,
})
