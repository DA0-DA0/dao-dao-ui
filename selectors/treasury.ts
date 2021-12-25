import { selector, selectorFamily } from 'recoil'
import { IndexedTx, Coin } from '@cosmjs/stargate'
import {
  // Cw20Coin,
  Cw20BalancesResponse,
  // Cw20CoinVerified,
} from '@dao-dao/types/contracts/cw3-dao'
import {
  stargateClient,
  cosmWasmClient,
  kelprOfflineSigner,
} from 'selectors/cosm'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'

export const nativeBalance = selectorFamily({
  key: 'NativeBalance',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(stargateClient)
      const response = (await client.getAllBalances(address)) as Coin[]
      return response
    },
})

export const cw20Balances = selectorFamily({
  key: 'Cw20Balance',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const response = (await client.queryContractSmart(address, {
        cw20_balances: {},
      })) as Cw20BalancesResponse
      return response.cw20_balances
    },
})

export const cw20TokenInfo = selectorFamily({
  key: 'Cw20TokenInfo',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const response = (await client.queryContractSmart(address, {
        token_info: {},
      })) as TokenInfoResponse
      return response
    },
})

export const transactions = selectorFamily({
  key: 'Transactions',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const response = (await client.searchTx({
        sentFromOrTo: address,
      })) as IndexedTx[]
      return response
    },
})

export const walletAddress = selector({
  key: 'WalletAddress',
  get: async ({ get }) => {
    const client = get(kelprOfflineSigner)
    const [{ address }] = await client.getAccounts()
    return address
  },
})

export const walletTokenBalance = selectorFamily({
  key: 'WalletTokenBalance',
  get:
    (tokenAddress: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)

      const wallet = get(walletAddress)
      const response = (await client.queryContractSmart(tokenAddress, {
        balance: { address: wallet },
      })) as any
      return {
        amount: response.balance,
        address: tokenAddress,
      }
    },
})

export const walletStakedTokenBalance = selectorFamily({
  key: 'WalletStakedTokenBalance',
  get:
    (tokenAddress: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)

      const wallet = get(walletAddress)
      const response = (await client.queryContractSmart(tokenAddress, {
        staked_balance_at_height: { address: wallet },
      })) as any
      return {
        amount: response.balance,
        address: tokenAddress,
      }
    },
})
