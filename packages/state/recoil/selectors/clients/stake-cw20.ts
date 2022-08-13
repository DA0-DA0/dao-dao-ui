import { selectorFamily } from 'recoil'

import {
  ClaimsResponse,
  StakeCw20Client as ExecuteClient,
  GetConfigResponse,
  GetHooksResponse,
  StakeCw20QueryClient as QueryClient,
  StakedBalanceAtHeightResponse,
  StakedValueResponse,
  TotalStakedAtHeightResponse,
  TotalValueResponse,
} from '../../../clients/stake-cw20'
import {
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<QueryClient, QueryClientParams>({
  key: 'stakeCw20QueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new QueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  ExecuteClient | undefined,
  ExecuteClientParams
>({
  key: 'stakeCw20ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const stakedBalanceAtHeightSelector = selectorFamily<
  StakedBalanceAtHeightResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['stakedBalanceAtHeight']>
  }
>({
  key: 'stakeCw20StakedBalanceAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshWalletBalancesIdAtom(params[0].address))

      return await client.stakedBalanceAtHeight(...params)
    },
})

export const totalStakedAtHeightSelector = selectorFamily<
  TotalStakedAtHeightResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['totalStakedAtHeight']>
  }
>({
  key: 'stakeCw20TotalStakedAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshWalletBalancesIdAtom(undefined))

      return await client.totalStakedAtHeight(...params)
    },
})

export const stakedValueSelector = selectorFamily<
  StakedValueResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['stakedValue']>
  }
>({
  key: 'stakeCw20StakedValue',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshWalletBalancesIdAtom(params[0].address))

      return await client.stakedValue(...params)
    },
})

export const totalValueSelector = selectorFamily<
  TotalValueResponse,
  QueryClientParams
>({
  key: 'stakeCw20TotalValue',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshWalletBalancesIdAtom(undefined))

      return await client.totalValue()
    },
})

export const getConfigSelector = selectorFamily<
  GetConfigResponse,
  QueryClientParams
>({
  key: 'stakeCw20GetConfig',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.getConfig()
    },
})

export const claimsSelector = selectorFamily<
  ClaimsResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['claims']>
  }
>({
  key: 'stakeCw20Claims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshClaimsIdAtom(params[0].address))

      return await client.claims(...params)
    },
})

export const getHooksSelector = selectorFamily<
  GetHooksResponse,
  QueryClientParams
>({
  key: 'stakeCw20GetHooks',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.getHooks()
    },
})
