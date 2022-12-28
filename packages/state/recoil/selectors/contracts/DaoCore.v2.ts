import { selectorFamily, waitForAll } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
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
} from '@dao-dao/types/contracts/DaoCore.v2'

import { Cw721BaseSelectors, DaoVotingCw20StakedSelectors } from '.'
import {
  DaoCoreV2Client,
  DaoCoreV2QueryClient,
} from '../../../contracts/DaoCore.v2'
import {
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'
import * as Cw20BaseSelectors from './Cw20Base'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoCoreV2QueryClient,
  QueryClientParams
>({
  key: 'daoCoreV2QueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoCoreV2QueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  DaoCoreV2Client | undefined,
  ExecuteClientParams
>({
  key: 'daoCoreV2ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new DaoCoreV2Client(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const adminSelector = selectorFamily<
  AdminResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['admin']>
  }
>({
  key: 'daoCoreV2Admin',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const admin = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['adminNomination']>
  }
>({
  key: 'daoCoreV2AdminNomination',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const nomination = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['config']>
  }
>({
  key: 'daoCoreV2Config',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['cw20Balances']>
  }
>({
  key: 'daoCoreV2_Cw20Balances',
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
    params: Parameters<DaoCoreV2QueryClient['cw20TokenList']>
  }
>({
  key: 'daoCoreV2_Cw20TokenList',
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
    params: Parameters<DaoCoreV2QueryClient['cw721TokenList']>
  }
>({
  key: 'daoCoreV2_Cw721TokenList',
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
    params: Parameters<DaoCoreV2QueryClient['dumpState']>
  }
>({
  key: 'daoCoreV2DumpState',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const state = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['getItem']>
  }
>({
  key: 'daoCoreV2GetItem',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const item = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['listItems']>
  }
>({
  key: 'daoCoreV2_ListItems',
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
    params: Parameters<DaoCoreV2QueryClient['proposalModules']>
  }
>({
  key: 'daoCoreV2ProposalModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const proposalModules = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['activeProposalModules']>
  }
>({
  key: 'daoCoreV2ActiveProposalModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const activeProposalModules = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['pauseInfo']>
  }
>({
  key: 'daoCoreV2PauseInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const paused = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['votingModule']>
  }
>({
  key: 'daoCoreV2VotingModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const votingModule = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['listSubDaos']>
  }
>({
  key: 'daoCoreV2_ListSubDaos',
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
    params: Parameters<DaoCoreV2QueryClient['daoURI']>
  }
>({
  key: 'daoCoreV2DaoURI',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const daoUri = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoCoreV2VotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(
        refreshDaoVotingPowerAtom(queryClientParams.contractAddress)
      )

      const votingPower = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoCoreV2TotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(
        refreshDaoVotingPowerAtom(queryClientParams.contractAddress)
      )

      const totalPower = get(
        queryContractIndexerSelector({
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
    params: Parameters<DaoCoreV2QueryClient['info']>
  }
>({
  key: 'daoCoreV2Info',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryContractIndexerSelector({
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
  key: 'daoCoreV2AllCw20TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryContractIndexerSelector({
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
  key: 'daoCoreV2AllCw20Infos',
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
  key: 'daoCoreV2AllCw20Balances',
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
        queryContractIndexerSelector({
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
  key: 'daoCoreV2AllCw721TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryContractIndexerSelector({
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

// Get all CW721 collections in the DAO's list, filtered by the DAO being the
// minter.
export const allCw721CollectionsWithDaoAsMinterSelector = selectorFamily<
  ({ address: string } & ContractInfoResponse)[],
  QueryClientParams
>({
  key: 'daoCoreV2AllCw721CollectionsWithDaoAsMinter',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const tokenList: Cw721TokenListResponse = get(
        allCw721TokenListSelector(queryClientParams)
      )
      const minterResponses = get(
        waitForAll(
          tokenList.map((token) =>
            Cw721BaseSelectors.minterSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: token,
              params: [],
            })
          )
        )
      )

      // Filter out collections that don't have the DAO as the minter.
      const collectionsWithDaoAsMinter = tokenList.filter(
        (_, idx) =>
          minterResponses[idx].minter === queryClientParams.contractAddress
      )

      const collectionInfos = get(
        waitForAll(
          collectionsWithDaoAsMinter.map((collection) =>
            Cw721BaseSelectors.contractInfoSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: collection,
              params: [],
            })
          )
        )
      )

      return collectionsWithDaoAsMinter.map((collection, idx) => ({
        address: collection,
        ...collectionInfos[idx],
      }))
    },
})

const SUBDAO_LIST_LIMIT = 30
export const listAllSubDaosSelector = selectorFamily<
  ListSubDaosResponse,
  QueryClientParams
>({
  key: 'daoCoreV2ListAllSubDaos',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryContractIndexerSelector({
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
  key: 'daoCoreV2AllSubDaoConfigs',
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
  key: 'daoCoreV2TryFetchGovernanceTokenAddress',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const votingModuleAddress = get(
        votingModuleSelector({ ...queryClientParams, params: [] })
      )
      const governanceTokenAddress = get(
        DaoVotingCw20StakedSelectors.tokenContractSelector({
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
  key: 'daoCoreV2ListAllItems',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryContractIndexerSelector({
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
