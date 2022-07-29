import { selectorFamily } from 'recoil'

import {
  AllAccountsResponse,
  AllAllowancesResponse,
  AllowanceResponse,
  BalanceResponse,
  DownloadLogoResponse,
  Cw20Client as ExecuteClient,
  MarketingInfoResponse,
  MinterResponse,
  Cw20QueryClient as QueryClient,
  TokenInfoResponse,
} from '../../../clients/cw20-base'
import {
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<QueryClient, QueryClientParams>({
  key: 'cw20BaseQueryClient',
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

export const balanceSelector = selectorFamily<
  BalanceResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['balance']>
  }
>({
  key: 'cw20BaseBalance',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshWalletBalancesIdAtom(params[0].address))

      return await client.balance(...params)
    },
})

export const tokenInfoSelector = selectorFamily<
  TokenInfoResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['tokenInfo']>
  }
>({
  key: 'cw20BaseTokenInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.tokenInfo(...params)
    },
})

export const minterSelector = selectorFamily<
  MinterResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['minter']>
  }
>({
  key: 'cw20BaseMinter',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.minter(...params)
    },
})

export const allowanceSelector = selectorFamily<
  AllowanceResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['allowance']>
  }
>({
  key: 'cw20BaseAllowance',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshWalletBalancesIdAtom(params[0].owner))

      return await client.allowance(...params)
    },
})

export const allAllowancesSelector = selectorFamily<
  AllAllowancesResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['allAllowances']>
  }
>({
  key: 'cw20BaseAllAllowances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshWalletBalancesIdAtom(params[0].owner))

      return await client.allAllowances(...params)
    },
})

export const allAccountsSelector = selectorFamily<
  AllAccountsResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['allAccounts']>
  }
>({
  key: 'cw20BaseAllAccounts',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.allAccounts(...params)
    },
})

export const marketingInfoSelector = selectorFamily<
  MarketingInfoResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['marketingInfo']>
  }
>({
  key: 'cw20BaseMarketingInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.marketingInfo(...params)
    },
})

export const downloadLogoSelector = selectorFamily<
  DownloadLogoResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['downloadLogo']>
  }
>({
  key: 'cw20BaseDownloadLogo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.downloadLogo(...params)
    },
})
