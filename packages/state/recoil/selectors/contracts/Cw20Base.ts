import { selectorFamily } from 'recoil'

import {
  AmountWithTimestamp,
  TokenInfoResponseWithAddressAndLogo,
  WithChainId,
} from '@dao-dao/types'
import {
  AllAccountsResponse,
  AllAllowancesResponse,
  AllowanceResponse,
  BalanceResponse,
  DownloadLogoResponse,
  MarketingInfoResponse,
  MinterResponse,
  TokenInfoResponse,
} from '@dao-dao/types/contracts/Cw20Base'

import {
  Cw20BaseClient,
  Cw20BaseQueryClient,
} from '../../../contracts/Cw20Base'
import {
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<Cw20BaseQueryClient, QueryClientParams>({
  key: 'cw20BaseQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw20BaseQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  Cw20BaseClient | undefined,
  ExecuteClientParams
>({
  key: 'cw20BaseExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new Cw20BaseClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const balanceSelector = selectorFamily<
  BalanceResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['balance']>
  }
>({
  key: 'cw20BaseBalance',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      const balance = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20/balance',
          args: params[0],
          id,
        })
      )
      if (balance) {
        return { balance }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.balance(...params)
    },
})
export const tokenInfoSelector = selectorFamily<
  TokenInfoResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['tokenInfo']>
  }
>({
  key: 'cw20BaseTokenInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const tokenInfo = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20/tokenInfo',
        })
      )
      if (tokenInfo) {
        return tokenInfo
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.tokenInfo(...params)
    },
})
export const minterSelector = selectorFamily<
  MinterResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['minter']>
  }
>({
  key: 'cw20BaseMinter',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const minter = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20/minter',
        })
      )
      if (minter) {
        return minter
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.minter(...params)
    },
})
export const allowanceSelector = selectorFamily<
  AllowanceResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['allowance']>
  }
>({
  key: 'cw20BaseAllowance',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].owner))

      const allowance = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20/allowance',
          args: params[0],
          id,
        })
      )
      if (allowance) {
        return allowance
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.allowance(...params)
    },
})
export const allAllowancesSelector = selectorFamily<
  AllAllowancesResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['allAllowances']>
  }
>({
  key: 'cw20BaseAllAllowances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].owner))

      const allowances = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20/ownerAllowances',
          args: params[0],
          id,
        })
      )
      if (allowances) {
        return { allowances }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.allAllowances(...params)
    },
})
export const allAccountsSelector = selectorFamily<
  AllAccountsResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['allAccounts']>
  }
>({
  key: 'cw20BaseAllAccounts',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const accounts = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20/allAccounts',
          args: params[0],
        })
      )
      if (accounts) {
        return { accounts }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.allAccounts(...params)
    },
})
export const marketingInfoSelector = selectorFamily<
  MarketingInfoResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['marketingInfo']>
  }
>({
  key: 'cw20BaseMarketingInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const marketingInfo = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20/marketingInfo',
        })
      )
      if (marketingInfo) {
        return marketingInfo
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.marketingInfo(...params)
    },
})
export const downloadLogoSelector = selectorFamily<
  DownloadLogoResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['downloadLogo']>
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

//! Custom

export const balanceWithTimestampSelector = selectorFamily<
  AmountWithTimestamp,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['balance']>
  }
>({
  key: 'cw20BaseBalanceWithTimestamp',
  get:
    (params) =>
    ({ get }) => {
      const amount = Number(get(balanceSelector(params)).balance)

      return {
        amount,
        timestamp: new Date(),
      }
    },
})

export const logoUrlSelector = selectorFamily<
  string | undefined,
  QueryClientParams
>({
  key: 'cw20BaseLogoUrl',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const logoUrl = get(
        queryContractIndexerSelector({
          contractAddress,
          chainId,
          formulaName: 'cw20/logoUrl',
        })
      )
      // Null when indexer fails.
      if (logoUrl !== null) {
        return logoUrl
      }

      // If indexer query fails, fallback to contract query.
      const logoInfo = get(
        marketingInfoSelector({
          contractAddress,
          chainId,
          params: [],
        })
      ).logo
      return !!logoInfo && logoInfo !== 'embedded' && 'url' in logoInfo
        ? logoInfo.url
        : undefined
    },
})

export const tokenInfoWithAddressAndLogoSelector = selectorFamily<
  TokenInfoResponseWithAddressAndLogo,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['tokenInfo']>
  }
>({
  key: 'cw20BaseTokenInfoWithAddressAndLogo',
  get:
    (params) =>
    async ({ get }) => {
      const tokenInfo = get(tokenInfoSelector(params))
      const logoInfo = get(marketingInfoSelector(params)).logo

      return {
        address: params.contractAddress,
        ...tokenInfo,
        logoUrl:
          !!logoInfo && logoInfo !== 'embedded' && 'url' in logoInfo
            ? logoInfo.url
            : undefined,
      }
    },
})

export const topAccountBalancesSelector = selectorFamily<
  | {
      address: string
      balance: string
    }[]
  | undefined,
  QueryClientParams & { limit?: number }
>({
  key: 'cw20BaseListTopAccountBalances',
  get:
    ({ limit, ...queryClientParams }) =>
    ({ get }) =>
      get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20/topAccountBalances',
          args: {
            limit,
          },
        })
      ) ?? undefined,
})

// Get DAOs that use this cw20 token as their governance token from the indexer.
export const daosSelector = selectorFamily<string[], QueryClientParams>({
  key: 'cw20BaseDaos',
  get:
    (queryClientParams) =>
    ({ get }) =>
      get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20/daos',
        })
      ) ?? [],
})
