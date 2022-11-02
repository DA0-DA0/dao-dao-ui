import { AtomEffect } from 'recoil'

import { CHAIN_ID } from '@dao-dao/utils'

export const getLocalStorageNamespacedKey = (key: string) =>
  `${CHAIN_ID}:${key}`

export const localStorageEffect =
  <T>(
    serialize: (value: T) => string,
    parse: (saved: string) => T
  ): AtomEffect<T> =>
  ({ node: { key }, setSelf, onSet }) => {
    // Do nothing on server.
    if (typeof localStorage === 'undefined') {
      return
    }

    // Namespace localStorage keys to prevent collisions.
    const namespacedKey = getLocalStorageNamespacedKey(key)

    const savedValue = localStorage.getItem(namespacedKey)
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

export const localStorageEffectJSON = localStorageEffect(
  JSON.stringify,
  JSON.parse
)
