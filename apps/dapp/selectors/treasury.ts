import { atomFamily, selector, selectorFamily } from 'recoil'

import { IndexedTx, Coin } from '@cosmjs/stargate'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { Cw20CoinVerified } from '@dao-dao/types/contracts/cw3-dao'
import { ClaimsResponse } from '@dao-dao/types/contracts/stake-cw20'

import { treasuryTokenListUpdates } from '../atoms/treasury'
import {
  stargateClient,
  cosmWasmClient,
  walletAddress,
} from '../selectors/cosm'

export { walletAddress }

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
      // Invalidate state if the token list has been updated.
      get(treasuryTokenListUpdates(address))
      const client = get(cosmWasmClient)

      const balances: Cw20CoinVerified[] = []
      let more = true
      while (more) {
        const latest = balances.length
          ? balances[balances.length - 1].address
          : undefined
        const response = await client.queryContractSmart(address, {
          cw20_balances: {
            limit: 5,
            ...(latest ? { start_after: latest } : {}),
          },
        })
        more = response.cw20_balances.length === 5
        balances.push(...response.cw20_balances)
      }

      return balances
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

export const cw20TokensList = selectorFamily({
  key: 'Cw20TokensList',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const tokens: string[] = (
        await client.queryContractSmart(address, {
          cw20_token_list: {},
        })
      ).token_list
      return tokens
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

// Counts the number of times that a wallet token balance has been
// changed. Used to invalidate state when a staking event occurs.
export const walletTokenBalanceUpdateCountAtom = atomFamily<number, string>({
  key: 'walletTokenBalanceUpdateCount',
  default: 0,
})

// Tracks if the token balance for a wallet is loading. This will be
// true when we are staking / unstaking tokens.
export const walletTokenBalanceLoading = atomFamily<boolean, string>({
  key: 'walletTokenBalanceLoading',
  default: false,
})

export const walletTokenBalance = selectorFamily({
  key: 'WalletTokenBalance',
  get:
    (tokenAddress: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)

      const wallet = get(walletAddress)
      if (!wallet) {
        return {
          amount: 0.0,
        }
      }
      get(walletTokenBalanceUpdateCountAtom(wallet))

      const response = (await client.queryContractSmart(tokenAddress, {
        balance: { address: wallet },
      })) as any
      return {
        amount: Number(response.balance),
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
      if (!wallet) {
        return {
          amount: 0.0,
        }
      }
      get(walletTokenBalanceUpdateCountAtom(wallet))

      const response = (await client.queryContractSmart(tokenAddress, {
        staked_balance_at_height: { address: wallet },
      })) as any

      return {
        amount: response.balance,
        address: tokenAddress,
      }
    },
})

export const walletStakedTokenBalanceAtHeightSelector = selectorFamily<
  number,
  { stakingAddress: string; height: number }
>({
  key: 'walletStakedBalanceAtHeightSelector',
  get:
    ({ stakingAddress, height }) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const wallet = get(walletAddress)
      if (!client || !wallet) {
        return 0
      }
      const response = (await client.queryContractSmart(stakingAddress, {
        staked_balance_at_height: { address: wallet, height },
      })) as any

      return Number(response.balance)
    },
})

export const walletClaims = selectorFamily({
  key: 'WalletClaims',
  get:
    (stakingAddress: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const wallet = get(walletAddress)
      if (!wallet) {
        return { claims: [] }
      }
      get(walletTokenBalanceUpdateCountAtom(wallet))

      const response = (await client.queryContractSmart(stakingAddress, {
        claims: { address: wallet },
      })) as ClaimsResponse

      return response
    },
})

export const getBlockHeight = selector({
  key: 'ChainBlockHeight',
  get: async ({ get }) => {
    const wallet = get(walletAddress)
    get(walletTokenBalanceUpdateCountAtom(wallet))

    const client = get(cosmWasmClient)
    return await client.getHeight()
  },
})
