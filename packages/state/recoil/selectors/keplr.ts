import { OfflineSigner } from '@cosmjs/proto-signing'
import { selector } from 'recoil'

import {
  CHAIN_ID,
  getKeplr,
  getOfflineSignerAuto,
  KeplrNotInstalledError,
} from '@dao-dao/utils'

import { keplrConnectedBeforeKey, keplrKeystoreIdAtom } from '../atoms/keplr'
import { getLocalStorageNamespacedKey } from '../effects'

export const keplrOfflineSignerSelector = selector<OfflineSigner | undefined>({
  key: 'keplrOfflineSigner',
  get: async ({ get }) => {
    // Subscribe to keystore ID changes so we propagate new wallet selection.
    const id = get(keplrKeystoreIdAtom)
    if (id < 0) return

    try {
      return await getOfflineSignerAuto()
    } catch (error) {
      console.error(error)

      if (error instanceof KeplrNotInstalledError) {
        // If Keplr isn't installed, page might still be loading, so don't
        // yet clear localStorage. Ideally, only clear on Keplr failure or
        // connect request rejection.
        return
      }

      // If failed to connect and was previously connected, stop trying to connect automatically in the future.
      if (
        localStorage.getItem(
          getLocalStorageNamespacedKey(keplrConnectedBeforeKey)
        ) === 'true'
      ) {
        localStorage.removeItem(
          getLocalStorageNamespacedKey(keplrConnectedBeforeKey)
        )
      }
    }
  },
})

export const walletAddressSelector = selector({
  key: 'walletAddress',
  get: async ({ get }) => {
    const client = get(keplrOfflineSignerSelector)
    if (!client) return

    const [{ address }] = await client.getAccounts()
    return address
  },
})

export const walletAccountNameSelector = selector({
  key: 'walletAccountName',
  get: async ({ get }) => {
    // No account name if keplr not connected.
    const id = get(keplrKeystoreIdAtom)
    if (id < 0) return

    const keplr = await getKeplr()
    if (!keplr) return

    const info = await keplr.getKey(CHAIN_ID)
    return info?.name
  },
})
