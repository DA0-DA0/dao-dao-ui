import JSON5 from 'json5'
import { selector, selectorFamily } from 'recoil'

import {
  CHAIN_RPC_ENDPOINT,
  NATIVE_DENOM,
  cosmWasmClientRouter,
  stargateClientRouter,
} from '@dao-dao/utils'

import { refreshWalletBalancesIdAtom } from '../atoms/refresh'

export const stargateClientSelector = selector({
  key: 'stargateClient',
  get: () => stargateClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const cosmWasmClientSelector = selector({
  key: 'cosmWasmClient',
  get: () => cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const blockHeightSelector = selector({
  key: 'blockHeight',
  get: async ({ get }) => {
    const client = get(cosmWasmClientSelector)
    if (!client) return

    return await client.getHeight()
  },
})

export const blockHeightTimestampSelector = selectorFamily<
  Date | undefined,
  number
>({
  key: 'blockHeightTimestamp',
  get:
    (blockHeight) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) return

      try {
        const block = await client.getBlock(blockHeight)
        return new Date(Date.parse(block.header.time))
      } catch (error) {
        console.error(error)
      }
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
