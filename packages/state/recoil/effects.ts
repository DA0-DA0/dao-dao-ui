import { AtomEffect } from 'recoil'

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

    const savedValue = localStorage.getItem(key)
    if (savedValue !== null) {
      setSelf(parse(savedValue))
    }

    onSet((newValue: T, _: any, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, serialize(newValue))
      }
    })
  }

export const localStorageEffectJSON = localStorageEffect(
  JSON.stringify,
  JSON.parse
)
