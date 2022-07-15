import { selectorFamily, waitForAll } from 'recoil'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { VotingModuleType, parseVotingModuleContractName } from '@dao-dao/utils'

import { Cw20BaseSelectors, Cw20StakedBalanceVotingSelectors } from '..'
import {
  AdminResponse,
  ConfigResponse,
  Cw20BalancesResponse,
  Cw20TokenListResponse,
  Cw721TokenListResponse,
  DumpStateResponse,
  CwCoreClient as ExecuteClient,
  GetItemResponse,
  InfoResponse,
  ListItemsResponse,
  PauseInfoResponse,
  ProposalModulesResponse,
  CwCoreQueryClient as QueryClient,
  TotalPowerAtHeightResponse,
  VotingModuleResponse,
  VotingPowerAtHeightResponse,
} from '../../../../clients/cw-core/0.2.0'
import {
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../../atoms'
import { cosmWasmClientSelector } from '../../chain'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<QueryClient | undefined, QueryClientParams>({
  key: 'cwCoreQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) return

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
  key: 'cwCoreExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const adminSelector = selectorFamily<
  AdminResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreAdmin',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.admin()
    },
})

export const configSelector = selectorFamily<
  ConfigResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreConfig',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.config()
    },
})

export const votingModuleSelector = selectorFamily<
  VotingModuleResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreVotingModule',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.votingModule()
    },
})

export const pauseInfoSelector = selectorFamily<
  PauseInfoResponse | undefined,
  QueryClientParams
>({
  key: 'cwCorePauseInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.pauseInfo()
    },
})

export const proposalModulesSelector = selectorFamily<
  ProposalModulesResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['proposalModules']> }
>({
  key: 'cwCoreGovernanceModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.proposalModules(...params)
    },
})

export const dumpStateSelector = selectorFamily<
  DumpStateResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreDumpState',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.dumpState()
    },
})

export const getItemSelector = selectorFamily<
  GetItemResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['getItem']> }
>({
  key: 'cwCoreGetItem',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.getItem(...params)
    },
})

export const listItemsSelector = selectorFamily<
  ListItemsResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['listItems']> }
>({
  key: 'cwCoreListItems',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.listItems(...params)
    },
})

export const cw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['cw20TokenList']> }
>({
  key: 'cwCoreCw20TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.cw20TokenList(...params)
    },
})

const CW20_TOKEN_LIST_LIMIT = 10
export const allCw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreAllCw20TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      //! Check if has governance token, and add to list if necessary.
      const votingModuleAddress = get(votingModuleSelector(queryClientParams))
      // All `info` queries are the same, so just use cw-core's info query.
      const votingModuleInfo = votingModuleAddress
        ? get(infoSelector({ contractAddress: votingModuleAddress }))
        : undefined
      const votingModuleType =
        votingModuleInfo &&
        parseVotingModuleContractName(votingModuleInfo.info.contract)
      const governanceTokenAddress =
        votingModuleAddress &&
        votingModuleType === VotingModuleType.Cw20StakedBalanceVoting
          ? get(
              Cw20StakedBalanceVotingSelectors.tokenContractSelector({
                contractAddress: votingModuleAddress,
              })
            )
          : undefined

      //! Get all tokens.
      let startAt: string | undefined

      const tokenList: Cw20TokenListResponse = []
      while (true) {
        const response = await get(
          cw20TokenListSelector({
            ...queryClientParams,
            params: [{ startAt, limit: CW20_TOKEN_LIST_LIMIT }],
          })
        )
        if (!response?.length) break

        // Don't double-add last token since we set startAt to it for
        // the next query.
        tokenList.push(...response.slice(0, -1))
        startAt = response[response.length - 1]

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW20_TOKEN_LIST_LIMIT) {
          // Add last token to the list since we ignored it.
          tokenList.push(response[response.length - 1])
          break
        }
      }

      //! Add governance token if exists but missing from list.
      if (
        governanceTokenAddress &&
        !tokenList.includes(governanceTokenAddress)
      ) {
        // Add to beginning of list.
        tokenList.splice(0, 0, governanceTokenAddress)
      }

      return tokenList
    },
})

export const cw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['cw721TokenList']> }
>({
  key: 'cwCoreCw721TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.cw721TokenList(...params)
    },
})

export const cw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['cw20Balances']> }
>({
  key: 'cwCoreCw20Balances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      get(refreshWalletBalancesIdAtom(queryClientParams.contractAddress))

      return await client.cw20Balances(...params)
    },
})

const CW20_BALANCES_LIMIT = 10
export const allCw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreAllCw20Balances',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      //! Check if has governance token, and add to list if necessary.
      const votingModuleAddress = get(votingModuleSelector(queryClientParams))
      // All `info` queries are the same, so just use cw-core's info query.
      const votingModuleInfo = votingModuleAddress
        ? get(infoSelector({ contractAddress: votingModuleAddress }))
        : undefined
      const votingModuleType =
        votingModuleInfo &&
        parseVotingModuleContractName(votingModuleInfo.info.contract)
      const governanceTokenAddress =
        votingModuleAddress &&
        votingModuleType === VotingModuleType.Cw20StakedBalanceVoting
          ? get(
              Cw20StakedBalanceVotingSelectors.tokenContractSelector({
                contractAddress: votingModuleAddress,
              })
            )
          : undefined
      const governanceTokenBalance = governanceTokenAddress
        ? get(
            Cw20BaseSelectors.balanceSelector({
              contractAddress: governanceTokenAddress,
              params: [{ address: queryClientParams.contractAddress }],
            })
          )?.balance
        : undefined

      //! Get all balances.
      let startAt: string | undefined

      const balances: Cw20BalancesResponse = []
      while (true) {
        const response = await get(
          cw20BalancesSelector({
            ...queryClientParams,
            params: [{ startAt, limit: CW20_BALANCES_LIMIT }],
          })
        )
        if (!response?.length) break

        // Don't double-add last balance since we set startAt to it for
        // the next query.
        balances.push(...response.slice(0, -1))
        startAt = response[response.length - 1].addr

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW20_BALANCES_LIMIT) {
          // Add last balance to the list since we ignored it.
          balances.push(response[response.length - 1])
          break
        }
      }

      //! Add governance token balance if exists but missing from list.
      if (
        governanceTokenAddress &&
        governanceTokenBalance &&
        !balances.some(({ addr }) => addr === governanceTokenAddress)
      ) {
        // Add to beginning of list.
        balances.splice(0, 0, {
          addr: governanceTokenAddress,
          balance: governanceTokenBalance,
        })
      }

      return balances
    },
})

export const cw20BalancesInfoSelector = selectorFamily<
  { symbol: string; denom: string; amount: string; decimals: number }[],
  { address: string }
>({
  key: 'cw20BalancesInfo',
  get:
    ({ address }) =>
    async ({ get }) => {
      const cw20List =
        get(allCw20BalancesSelector({ contractAddress: address })) ?? []

      const cw20Info = get(
        waitForAll(
          cw20List.map(({ addr }) =>
            Cw20BaseSelectors.tokenInfoSelector({
              contractAddress: addr,
              params: [],
            })
          )
        )
      ).filter(Boolean) as TokenInfoResponse[]

      const cw20Tokens = cw20Info.map((info, idx) => {
        return {
          symbol: info.symbol,
          denom: cw20List[idx].addr,
          amount: cw20List[idx].balance,
          decimals: info.decimals,
        }
      })
      return cw20Tokens
    },
})

export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['votingPowerAtHeight']> }
>({
  key: 'cwCoreVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      get(refreshWalletBalancesIdAtom(params[0].address))

      return await client.votingPowerAtHeight(...params)
    },
})

export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['totalPowerAtHeight']> }
>({
  key: 'cwCoreTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      get(refreshWalletBalancesIdAtom(undefined))

      return await client.totalPowerAtHeight(...params)
    },
})

export const infoSelector = selectorFamily<
  InfoResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.info()
    },
})
