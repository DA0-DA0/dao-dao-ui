import { atom, AtomEffect } from 'recoil'

// As a relic of when we were doing non-backwards compatible changes on the
// testnet we used to namespace a user's favorited DAOs / Multisigs. That
// namespacing used to occur based on the DAO code ID what was being used so we
// now lock the namespace to the last DAO code ID before we got stopped removing
// favorites when the contracts were updated.
const NAMESPACE = process.env.NEXT_PUBLIC_FAVORITES_NAMESPACE as string

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet, node: _ }) => {
    const lookup_key = `${NAMESPACE}_${key}`

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
