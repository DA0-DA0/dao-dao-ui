import { selector } from 'recoil'

import { CHAIN_ID, getKeplr, getOfflineSignerAuto } from '@dao-dao/utils'

import { keplrConnectedBeforeKey, keplrKeystoreIdAtom } from '../atoms/keplr'

export const keplrOfflineSigner = selector({
  key: 'keplrOfflineSigner',
  get: async ({ get }) => {
    // Subscribe to keystore ID changes so we propagate new wallet selection.
    const id = get(keplrKeystoreIdAtom)
    if (id < 0) return

    try {
      return await getOfflineSignerAuto()
    } catch (error) {
      console.error(error)

      // If failed to connect and was previously connected, stop trying to connect automatically in the future.
      if (localStorage.getItem(keplrConnectedBeforeKey) === 'true') {
        localStorage.removeItem(keplrConnectedBeforeKey)
      }
    }
  },
})

export const walletAddress = selector({
  key: 'walletAddress',
  get: async ({ get }) => {
    const client = get(keplrOfflineSigner)
    if (!client) return

    const [{ address }] = await client.getAccounts()
    return address
  },
})

export const accountName = selector({
  key: 'accountName',
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
