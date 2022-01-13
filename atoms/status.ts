import { atom } from 'recoil'

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
