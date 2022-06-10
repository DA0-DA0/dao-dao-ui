import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { selector, selectorFamily } from 'recoil'

import {
  CHAIN_RPC_ENDPOINT,
  cosmWasmClientRouter,
  GAS_PRICE,
  NATIVE_DENOM,
  stargateClientRouter,
} from '@dao-dao/utils'

import { refreshWalletBalancesIdAtom } from '../atoms/refresh'
import { walletOfflineSignerSelector } from './wallet'

export const stargateClientSelector = selector({
  key: 'stargateClient',
  get: () => stargateClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const cosmWasmClientSelector = selector({
  key: 'cosmWasmClient',
  get: () => cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const signingCosmWasmClientSelector = selector({
  key: 'signingCosmWasmClient',
  get: async ({ get }) => {
    const signer = get(walletOfflineSignerSelector)
    if (!signer) return

    const client = await SigningCosmWasmClient.connectWithSigner(
      CHAIN_RPC_ENDPOINT,
      signer,
      {
        gasPrice: GasPrice.fromString(GAS_PRICE),
      }
    )
    // Load client ID before becoming immutable.
    await client.getChainId()

    return client
  },
  dangerouslyAllowMutability: true,
})

export const blockHeightSelector = selector({
  key: 'blockHeight',
  get: async ({ get }) => {
    const client = get(cosmWasmClientSelector)
    if (!client) return

    return await client.getHeight()
  },
})

export const nativeBalancesSelector = selectorFamily({
  key: 'nativeBalances',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(stargateClientSelector)
      if (!client) return

      get(refreshWalletBalancesIdAtom(address))

      const balances = [...(await client.getAllBalances(address))]
      // Add native denom if not present.
      if (!balances.some(({ denom }) => denom === NATIVE_DENOM)) {
        balances.push({
          amount: '0',
          denom: NATIVE_DENOM,
        })
      }

      return balances
    },
})

export const nativeBalanceSelector = selectorFamily({
  key: 'nativeBalance',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(stargateClientSelector)
      if (!client) return

      get(refreshWalletBalancesIdAtom(address))

      return await client.getBalance(address, NATIVE_DENOM)
    },
})

export const transactionEventsSelector = selectorFamily<
  Record<string, any>[],
  string
>({
  key: 'transactionEvents',
  get:
    (hash: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) return

      const tx = await client.getTx(hash)
      return tx?.rawLog ? JSON5.parse(tx.rawLog)[0].events : undefined
    },
})
