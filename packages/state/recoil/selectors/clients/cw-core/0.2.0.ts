import { selectorFamily, waitForAll } from 'recoil'

import {
  Cw20StakedBalanceVotingAdapter,
  matchAdapter,
} from '@dao-dao/voting-module-adapter'

import { Cw20BaseSelectors, Cw20StakedBalanceVotingSelectors } from '..'
import {
  ActiveProposalModulesResponse,
  AdminNominationResponse,
  AdminResponse,
  ConfigResponse,
  Cw20BalancesResponse,
  Cw20TokenListResponse,
  Cw721TokenListResponse,
  CwCoreV0_2_0Client,
  CwCoreV0_2_0QueryClient,
  DaoURIResponse,
  DumpStateResponse,
  GetItemResponse,
  InfoResponse,
  ListItemsResponse,
  ListSubDaosResponse,
  PauseInfoResponse,
  ProposalModulesResponse,
  TotalPowerAtHeightResponse,
  VotingModuleResponse,
  VotingPowerAtHeightResponse,
} from '../../../../clients/cw-core/0.2.0'
import { TokenInfoResponse } from '../../../../clients/cw20-base'
import {
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../../atoms'
import { cosmWasmClientSelector } from '../../chain'

type QueryClientParams = {
  contractAddress: string
}

export const queryClient = selectorFamily<
  CwCoreV0_2_0QueryClient,
  QueryClientParams
>({
  key: 'cwCoreV0_2_0QueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new CwCoreV0_2_0QueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwCoreV0_2_0Client | undefined,
  ExecuteClientParams
>({
  key: 'cwCoreV0_2_0ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwCoreV0_2_0Client(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const adminSelector = selectorFamily<
  AdminResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['admin']>
  }
>({
  key: 'cwCoreV0_2_0Admin',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.admin(...params)
    },
})
export const adminNominationSelector = selectorFamily<
  AdminNominationResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['adminNomination']>
  }
>({
  key: 'cwCoreV0_2_0AdminNomination',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.adminNomination(...params)
    },
})
export const configSelector = selectorFamily<
  ConfigResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['config']>
  }
>({
  key: 'cwCoreV0_2_0Config',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const cw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['cw20Balances']>
  }
>({
  key: 'cwCoreV0_2_0Cw20Balances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(queryClientParams.contractAddress))
      return await client.cw20Balances(...params)
    },
})
export const cw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['cw20TokenList']>
  }
>({
  key: 'cwCoreV0_2_0Cw20TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.cw20TokenList(...params)
    },
})
export const cw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['cw721TokenList']>
  }
>({
  key: 'cwCoreV0_2_0Cw721TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.cw721TokenList(...params)
    },
})
export const dumpStateSelector = selectorFamily<
  DumpStateResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['dumpState']>
  }
>({
  key: 'cwCoreV0_2_0DumpState',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dumpState(...params)
    },
})
export const getItemSelector = selectorFamily<
  GetItemResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['getItem']>
  }
>({
  key: 'cwCoreV0_2_0GetItem',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getItem(...params)
    },
})
export const listItemsSelector = selectorFamily<
  ListItemsResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['listItems']>
  }
>({
  key: 'cwCoreV0_2_0ListItems',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listItems(...params)
    },
})
export const proposalModulesSelector = selectorFamily<
  ProposalModulesResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['proposalModules']>
  }
>({
  key: 'cwCoreV0_2_0ProposalModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalModules(...params)
    },
})
export const activeProposalModulesSelector = selectorFamily<
  ActiveProposalModulesResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['activeProposalModules']>
  }
>({
  key: 'cwCoreV0_2_0ActiveProposalModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.activeProposalModules(...params)
    },
})
export const pauseInfoSelector = selectorFamily<
  PauseInfoResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['pauseInfo']>
  }
>({
  key: 'cwCoreV0_2_0PauseInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.pauseInfo(...params)
    },
})
export const votingModuleSelector = selectorFamily<
  VotingModuleResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['votingModule']>
  }
>({
  key: 'cwCoreV0_2_0VotingModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.votingModule(...params)
    },
})
export const listSubDaosSelector = selectorFamily<
  ListSubDaosResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['listSubDaos']>
  }
>({
  key: 'cwCoreV0_2_0ListSubDaos',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listSubDaos(...params)
    },
})
export const daoURISelector = selectorFamily<
  DaoURIResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['daoURI']>
  }
>({
  key: 'cwCoreV0_2_0DaoURI',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.daoURI(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['votingPowerAtHeight']>
  }
>({
  key: 'cwCoreV0_2_0VotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.votingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['totalPowerAtHeight']>
  }
>({
  key: 'cwCoreV0_2_0TotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})
export const infoSelector = selectorFamily<
  InfoResponse,
  QueryClientParams & {
    params: Parameters<CwCoreV0_2_0QueryClient['info']>
  }
>({
  key: 'cwCoreV0_2_0Info',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})

const CW20_TOKEN_LIST_LIMIT = 30
export const allCw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse,
  QueryClientParams
>({
  key: 'cwCoreV0_2_0AllCw20TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      //! Check if has governance token, and add to list if necessary.
      const votingModuleAddress = get(
        votingModuleSelector({ ...queryClientParams, params: [] })
      )
      // All `info` queries are the same, so just use cw-core's info query.
      const votingModuleInfo = votingModuleAddress
        ? get(
            infoSelector({ contractAddress: votingModuleAddress, params: [] })
          )
        : undefined

      let hasGovernanceToken
      try {
        hasGovernanceToken =
          !!votingModuleInfo &&
          matchAdapter(votingModuleInfo.info.contract)?.id ===
            Cw20StakedBalanceVotingAdapter.id
      } catch {
        hasGovernanceToken = false
      }
      const governanceTokenAddress =
        votingModuleAddress && hasGovernanceToken
          ? get(
              Cw20StakedBalanceVotingSelectors.tokenContractSelector({
                contractAddress: votingModuleAddress,
              })
            )
          : undefined

      //! Get all tokens.
      const tokenList: Cw20TokenListResponse = []
      while (true) {
        const response = await get(
          cw20TokenListSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: tokenList[tokenList.length - 1],
                limit: CW20_TOKEN_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response.length) break

        tokenList.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW20_TOKEN_LIST_LIMIT) {
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

const CW20_BALANCES_LIMIT = 10
export const allCw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse,
  QueryClientParams
>({
  key: 'cwCoreV0_2_0AllCw20Balances',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      //! Check if has governance token, and add to list if necessary.
      const votingModuleAddress = get(
        votingModuleSelector({ ...queryClientParams, params: [] })
      )
      // All `info` queries are the same, so just use cw-core's info query.
      const votingModuleInfo = get(
        infoSelector({ contractAddress: votingModuleAddress, params: [] })
      )

      let hasGovernanceToken
      try {
        hasGovernanceToken =
          matchAdapter(votingModuleInfo.info.contract)?.id ===
          Cw20StakedBalanceVotingAdapter.id
      } catch {
        hasGovernanceToken = false
      }
      const governanceTokenAddress = hasGovernanceToken
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
          ).balance
        : undefined

      //! Get all balances.
      const balances: Cw20BalancesResponse = []
      while (true) {
        const response = await get(
          cw20BalancesSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: balances[balances.length - 1].addr,
                limit: CW20_BALANCES_LIMIT,
              },
            ],
          })
        )
        if (!response.length) break

        balances.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW20_BALANCES_LIMIT) {
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
  string
>({
  key: 'cwCoreV0_2_0Cw20BalancesInfo',
  get:
    (address) =>
    async ({ get }) => {
      const cw20List = get(
        allCw20BalancesSelector({ contractAddress: address })
      )

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

      return cw20Info.map(({ symbol, decimals }, idx) => ({
        symbol,
        denom: cw20List[idx].addr,
        amount: cw20List[idx].balance,
        decimals,
      }))
    },
})

const CW721_TOKEN_LIST_LIMIT = 30
export const allCw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreV0_2_0AllCw721TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const tokenList: Cw721TokenListResponse = []
      while (true) {
        const response = await get(
          cw721TokenListSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: tokenList[tokenList.length - 1],
                limit: CW721_TOKEN_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response?.length) break

        tokenList.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW721_TOKEN_LIST_LIMIT) {
          break
        }
      }

      return tokenList
    },
})
