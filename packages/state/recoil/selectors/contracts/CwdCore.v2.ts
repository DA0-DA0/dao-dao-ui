import { selectorFamily, waitForAll } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import {
  ActiveProposalModulesResponse,
  AdminNominationResponse,
  AdminResponse,
  ConfigResponse,
  Cw20BalanceResponse,
  Cw20BalancesResponse,
  Cw20TokenListResponse,
  Cw721TokenListResponse,
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
} from '@dao-dao/types/contracts/CwdCore.v2'

import { CwdVotingCw20StakedSelectors } from '.'
import {
  CwdCoreV2Client,
  CwdCoreV2QueryClient,
} from '../../../contracts/CwdCore.v2'
import {
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryIndexerSelector } from '../indexer'
import * as Cw20BaseSelectors from './Cw20Base'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwdCoreV2QueryClient,
  QueryClientParams
>({
  key: 'cwdCoreV2QueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwdCoreV2QueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwdCoreV2Client | undefined,
  ExecuteClientParams
>({
  key: 'cwdCoreV2ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwdCoreV2Client(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const adminSelector = selectorFamily<
  AdminResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['admin']>
  }
>({
  key: 'cwdCoreV2Admin',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const admin = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/admin',
        })
      )
      // Null when indexer fails. Undefined if no admin.
      if (admin !== null) {
        return admin || null
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.admin(...params)
    },
})
export const adminNominationSelector = selectorFamily<
  AdminNominationResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['adminNomination']>
  }
>({
  key: 'cwdCoreV2AdminNomination',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const nomination = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/adminNomination',
        })
      )
      // Null when indexer fails. Undefined if no nomination.
      if (nomination !== null) {
        return { nomination: nomination || null }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.adminNomination(...params)
    },
})
export const configSelector = selectorFamily<
  ConfigResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['config']>
  }
>({
  key: 'cwdCoreV2Config',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/config',
        })
      )
      if (config) {
        return config
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
// Use allCw20BalancesAndInfosSelector as it uses the indexer and implements
// pagination for chain queries.
export const _cw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['cw20Balances']>
  }
>({
  key: 'cwdCoreV2_Cw20Balances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(undefined))
      get(refreshWalletBalancesIdAtom(queryClientParams.contractAddress))
      return await client.cw20Balances(...params)
    },
})
// Use allCw20TokenListSelector as it uses the indexer and implements pagination
// for chain queries.
export const _cw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['cw20TokenList']>
  }
>({
  key: 'cwdCoreV2_Cw20TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.cw20TokenList(...params)
    },
})
// Use allCw721TokenListSelector as it uses the indexer and implements
// pagination for chain queries.
export const _cw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['cw721TokenList']>
  }
>({
  key: 'cwdCoreV2_Cw721TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.cw721TokenList(...params)
    },
})
// Reduced to only the necessary subset which can be provided by both the
// indexer and chain.
export const dumpStateSelector = selectorFamily<
  DumpStateResponse | undefined,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['dumpState']>
  }
>({
  key: 'cwdCoreV2DumpState',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const state = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/dumpState',
        })
      )
      if (state) {
        return state
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      try {
        return await client.dumpState(...params)
      } catch (err) {
        // Ignore errors. An undefined response is sometimes used to indicate
        // that this contract is not a DAO.
        console.error(err)
      }
    },
})
export const getItemSelector = selectorFamily<
  GetItemResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['getItem']>
  }
>({
  key: 'cwdCoreV2GetItem',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const item = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/item',
          args: params[0],
        })
      )
      // Null when indexer fails. Undefined if no item.
      if (item !== null) {
        return { item: item || null }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.getItem(...params)
    },
})
// Use listAllItemsSelector as it uses the indexer and implements pagination for
// chain queries.
export const _listItemsSelector = selectorFamily<
  ListItemsResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['listItems']>
  }
>({
  key: 'cwdCoreV2_ListItems',
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
    params: Parameters<CwdCoreV2QueryClient['proposalModules']>
  }
>({
  key: 'cwdCoreV2ProposalModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const proposalModules = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/proposalModules',
        })
      )
      if (proposalModules) {
        return proposalModules
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.proposalModules(...params)
    },
})
export const activeProposalModulesSelector = selectorFamily<
  ActiveProposalModulesResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['activeProposalModules']>
  }
>({
  key: 'cwdCoreV2ActiveProposalModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const activeProposalModules = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/activeProposalModules',
        })
      )
      if (activeProposalModules) {
        return activeProposalModules
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.activeProposalModules(...params)
    },
})
export const pauseInfoSelector = selectorFamily<
  PauseInfoResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['pauseInfo']>
  }
>({
  key: 'cwdCoreV2PauseInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const paused = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/paused',
        })
      )
      if (paused) {
        return paused
      }

      // If indexer fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.pauseInfo(...params)
    },
})
export const votingModuleSelector = selectorFamily<
  VotingModuleResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['votingModule']>
  }
>({
  key: 'cwdCoreV2VotingModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const votingModule = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/votingModule',
        })
      )
      if (votingModule) {
        return votingModule
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.votingModule(...params)
    },
})
// Use listAllSubDaosSelector as it uses the indexer and implements pagination
// for chain queries.
export const _listSubDaosSelector = selectorFamily<
  ListSubDaosResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['listSubDaos']>
  }
>({
  key: 'cwdCoreV2_ListSubDaos',
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
    params: Parameters<CwdCoreV2QueryClient['daoURI']>
  }
>({
  key: 'cwdCoreV2DaoURI',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const daoUri = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/daoUri',
        })
      )
      // Null when indexer fails. Undefined if no URI.
      if (daoUri !== null) {
        return daoUri || null
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.daoURI(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['votingPowerAtHeight']>
  }
>({
  key: 'cwdCoreV2VotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(
        refreshDaoVotingPowerAtom(queryClientParams.contractAddress)
      )

      const votingPower = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/votingPower',
          args: {
            address: params[0].address,
          },
          blockHeight: params[0].height,
          id,
        })
      )
      if (votingPower && !isNaN(votingPower)) {
        return {
          power: votingPower,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.votingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['totalPowerAtHeight']>
  }
>({
  key: 'cwdCoreV2TotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(
        refreshDaoVotingPowerAtom(queryClientParams.contractAddress)
      )

      const totalPower = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/totalPower',
          blockHeight: params[0].height,
          id,
        })
      )
      if (totalPower && !isNaN(totalPower)) {
        return {
          power: totalPower,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})

export const infoSelector = selectorFamily<
  InfoResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['info']>
  }
>({
  key: 'cwdCoreV2Info',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'info',
        })
      )
      if (info) {
        return { info }
      }

      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})

///! Custom selectors

const CW20_TOKEN_LIST_LIMIT = 30
export const allCw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse,
  QueryClientParams
>({
  key: 'cwdCoreV2AllCw20TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/cw20List',
        })
      )
      if (list) {
        return list
      }

      // If indexer query fails, fallback to contract query.

      const tokenList: Cw20TokenListResponse = []
      while (true) {
        const response = await get(
          _cw20TokenListSelector({
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

      return tokenList
    },
})

export const allCw20InfosSelector = selectorFamily<
  {
    address: string
    info: TokenInfoResponse
  }[],
  QueryClientParams & {
    governanceTokenAddress?: string
  }
>({
  key: 'cwdCoreV2AllCw20Infos',
  get:
    ({ governanceTokenAddress, ...queryClientParams }) =>
    async ({ get }) => {
      //! Get all addresses.
      const addresses = [...get(allCw20TokenListSelector(queryClientParams))]

      //! Add governance token balance if exists but missing from list.
      if (
        governanceTokenAddress &&
        !addresses.includes(governanceTokenAddress)
      ) {
        // Add to beginning of list.
        addresses.splice(0, 0, governanceTokenAddress)
      }

      const infos = get(
        waitForAll(
          addresses.map((contractAddress) =>
            Cw20BaseSelectors.tokenInfoSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress,
              params: [],
            })
          )
        )
      )

      return addresses.map((address, index) => ({
        address,
        info: infos[index],
      }))
    },
})

const CW20_BALANCES_LIMIT = 10
export const allCw20BalancesAndInfosSelector = selectorFamily<
  (Cw20BalanceResponse & {
    info: TokenInfoResponse
    imageUrl: string | undefined
    isGovernanceToken: boolean
  })[],
  QueryClientParams & {
    governanceTokenAddress?: string
  }
>({
  key: 'cwdCoreV2AllCw20Balances',
  get:
    ({ governanceTokenAddress, ...queryClientParams }) =>
    async ({ get }) => {
      const generalId = get(refreshWalletBalancesIdAtom(undefined))
      const specificId = get(
        refreshWalletBalancesIdAtom(queryClientParams.contractAddress)
      )

      const governanceTokenBalance = governanceTokenAddress
        ? get(
            Cw20BaseSelectors.balanceSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: governanceTokenAddress,
              params: [{ address: queryClientParams.contractAddress }],
            })
          ).balance
        : undefined

      let balances: Cw20BalancesResponse | null = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/cw20Balances',
          // Update each time one of these changes.
          id: generalId + specificId,
        })
      )
      if (balances) {
        // Copy to new array so we can mutate it below.
        balances = [...balances]
        // If indexer query fails, fallback to contract query.
      } else {
        balances = []
        while (true) {
          const response = await get(
            _cw20BalancesSelector({
              ...queryClientParams,
              params: [
                {
                  startAfter: balances[balances.length - 1]?.addr,
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

      const infos = get(
        waitForAll(
          balances.map(({ addr }) =>
            Cw20BaseSelectors.tokenInfoSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: addr,
              params: [],
            })
          )
        )
      )

      const cw20LogoUrls = get(
        waitForAll(
          balances.map(({ addr }) =>
            Cw20BaseSelectors.logoUrlSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,
              contractAddress: addr,
            })
          )
        )
      )

      return balances.map((balance, index) => ({
        ...balance,
        info: infos[index],
        imageUrl: cw20LogoUrls[index],
        isGovernanceToken:
          !!governanceTokenAddress && governanceTokenAddress === balance.addr,
      }))
    },
})

const CW721_TOKEN_LIST_LIMIT = 30
export const allCw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse,
  QueryClientParams
>({
  key: 'cwdCoreV2AllCw721TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/cw721List',
        })
      )
      if (list) {
        return list
      }

      // If indexer query fails, fallback to contract query.

      const tokenList: Cw721TokenListResponse = []
      while (true) {
        const response = await get(
          _cw721TokenListSelector({
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

const SUBDAO_LIST_LIMIT = 30
export const listAllSubDaosSelector = selectorFamily<
  ListSubDaosResponse,
  QueryClientParams
>({
  key: 'cwdCoreV2ListAllSubDaos',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/listSubDaos',
        })
      )
      if (list) {
        return list
      }

      // If indexer query fails, fallback to contract query.

      const subdaos: ListSubDaosResponse = []

      while (true) {
        const response = await get(
          _listSubDaosSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: subdaos[subdaos.length - 1]?.addr,
                limit: SUBDAO_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response?.length) break

        subdaos.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < SUBDAO_LIST_LIMIT) {
          break
        }
      }

      return subdaos
    },
})

export const allSubDaoConfigsSelector = selectorFamily<
  ({ address: string } & ConfigResponse)[],
  QueryClientParams
>({
  key: 'cwdCoreV2AllSubDaoConfigs',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const subDaos = get(listAllSubDaosSelector(queryClientParams))
      const subDaoConfigs = get(
        waitForAll(
          subDaos.map(({ addr }) =>
            configSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: addr,
              params: [],
            })
          )
        )
      )

      return subDaos.map(({ addr }, index) => ({
        address: addr,
        ...subDaoConfigs[index],
      }))
    },
})

// Will fail if cannot fetch governance token address.
export const tryFetchGovernanceTokenAddressSelector = selectorFamily<
  string,
  QueryClientParams
>({
  key: 'cwdCoreV2TryFetchGovernanceTokenAddress',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const votingModuleAddress = get(
        votingModuleSelector({ ...queryClientParams, params: [] })
      )
      const governanceTokenAddress = get(
        CwdVotingCw20StakedSelectors.tokenContractSelector({
          ...queryClientParams,
          contractAddress: votingModuleAddress,
          params: [],
        })
      )
      return governanceTokenAddress
    },
})

const ITEM_LIST_LIMIT = 30
export const listAllItemsSelector = selectorFamily<
  ListItemsResponse,
  QueryClientParams
>({
  key: 'cwdCoreV2ListAllItems',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/listItems',
        })
      )
      if (list) {
        return list
      }

      // If indexer query fails, fallback to contract query.

      const items: ListItemsResponse = []

      while (true) {
        const response = await get(
          _listItemsSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: items[items.length - 1],
                limit: ITEM_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response?.length) break

        items.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < ITEM_LIST_LIMIT) {
          break
        }
      }

      return items
    },
})
