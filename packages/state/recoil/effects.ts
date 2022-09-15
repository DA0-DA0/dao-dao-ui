import { AtomEffect } from 'recoil'

import { CHAIN_ID } from '@dao-dao/utils'

export const getLocalStorageNamespacedKey = (key: string) =>
  `${CHAIN_ID}:${key}`

export const localStorageEffect =
  <T>(
    key: string,
    serialize: (value: T) => string,
    parse: (saved: string) => T
  ): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    // Do nothing on server.
    if (typeof localStorage === 'undefined') {
      return
    }

    // Namespace localStorage keys to prevent collisions.
    const namespacedKey = getLocalStorageNamespacedKey(key)

    let savedValue = localStorage.getItem(namespacedKey)
    // If exists without namespace, prefix with current namespace for backwards
    // compatibility.
    if (savedValue === null && (savedValue = localStorage.getItem(key))) {
      localStorage.setItem(namespacedKey, savedValue)
    }

    if (savedValue !== null) {
      setSelf(parse(savedValue))
    }

    onSet((newValue: T, _: any, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(namespacedKey)
      } else {
        localStorage.setItem(namespacedKey, serialize(newValue))
      }
    })
  }

export const localStorageEffectJSON = <T>(key: string): AtomEffect<T> =>
  localStorageEffect(key, JSON.stringify, JSON.parse)
