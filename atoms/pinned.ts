import { atom, AtomEffect } from 'recoil'

const CODE_ID = process.env.NEXT_PUBLIC_DAO_CONTRACT_CODE_ID as string

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet, node: _ }) => {
    const lookup_key = `${CODE_ID}_${key}`

    const savedValue = localStorage.getItem(lookup_key)
    if (savedValue != null) {
      const json = JSON.parse(savedValue)
      setSelf(json)
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(lookup_key)
      } else {
        localStorage.setItem(lookup_key, JSON.stringify(newValue))
      }
    })
  }

export const pinnedDaosAtom = atom<string[]>({
  key: 'pinnedDaoAddresses',
  default: [],
  effects_UNSTABLE: [localStorageEffect<string[]>('pinnedDaos')],
})

export const pinnedMultisigsAtom = atom<string[]>({
  key: 'pinnedMultisigAddresses',
  default: [],
  effects_UNSTABLE: [localStorageEffect<string[]>('pinnedMultisigs')],
})
