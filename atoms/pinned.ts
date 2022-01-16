import { atom, AtomEffect } from 'recoil'

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet, node: _ }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      const json = JSON.parse(savedValue)
      setSelf(json)
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
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
