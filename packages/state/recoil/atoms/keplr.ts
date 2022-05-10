import { atom } from 'recoil'

import { localStorageEffect } from '../effects'

export const keplrConnectedBeforeKey = 'keplrConnectedBefore'
// Change keplrKeystoreId to trigger Keplr refresh/connect.
// Set to -1 to disable connection.
export const keplrKeystoreIdAtom = atom({
  key: 'keplrKeystoreId',
  default: -1,
  effects: [
    // Store whether previously connected, but restart at 0 on each page load instead of infinitely increment a value in their local storage.
    localStorageEffect(
      keplrConnectedBeforeKey,
      (id) => (id > -1).toString(),
      (saved) => (saved === 'true' ? 0 : -1)
    ),
  ],
})
