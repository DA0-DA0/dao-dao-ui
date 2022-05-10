import { OfflineSigner } from '@cosmjs/proto-signing'
import { KeplrWalletConnectV1 } from 'cosmodal'
import { selector } from 'recoil'

import {
  CHAIN_ID,
  getOfflineSignerAuto,
  getOfflineSignerOnlyAmino,
  NATIVE_DENOM,
} from '@dao-dao/utils'

import { refreshWalletBalancesIdAtom } from '../atoms/refresh'
import { walletClientAtom, walletConnectionIdAtom } from '../atoms/wallet'
import { stargateClientSelector } from './chain'

export const walletOfflineSignerSelector = selector<OfflineSigner | undefined>({
  key: 'walletOfflineSigner',
  get: async ({ get }) => {
    const walletClient = get(walletClientAtom)
    if (!walletClient) return

    get(walletConnectionIdAtom)

    try {
      // WalletConnect only supports Amino signing.
      if (walletClient instanceof KeplrWalletConnectV1) {
        return await getOfflineSignerOnlyAmino(walletClient)
      }

      return await getOfflineSignerAuto(walletClient)
    } catch (error) {
      console.error(error)
    }
  },
  dangerouslyAllowMutability: true,
})

export const walletAddressSelector = selector({
  key: 'walletAddress',
  get: async ({ get }) => {
    const client = get(walletOfflineSignerSelector)
    if (!client) return

    get(walletConnectionIdAtom)

    const [{ address }] = await client.getAccounts()
    return address
  },
})

export const walletAccountNameSelector = selector({
  key: 'walletAccountName',
  get: async ({ get }) => {
    const walletClient = get(walletClientAtom)
    if (!walletClient) return

    get(walletConnectionIdAtom)

    const info = await walletClient.getKey(CHAIN_ID)
    return info?.name
  },
})

export const walletNativeBalanceSelector = selector<number | undefined>({
  key: 'walletNativeBalance',
  get: async ({ get }) => {
    const client = get(stargateClientSelector)
    const address = get(walletAddressSelector)
    if (!client || !address) return

    get(refreshWalletBalancesIdAtom(address))

    const balance = await client.getBalance(address, NATIVE_DENOM)
    return Number(balance.amount)
  },
})
