import { selectorFamily, waitForAll } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import {
  ActiveProposalModulesResponse,
  AdminNominationResponse,
  AdminResponse,
  ConfigResponse,
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

import { DaoVotingCw20StakedSelectors } from '.'
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
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const cw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['cw20Balances']>
  }
>({
  key: 'daoCoreV2Cw20Balances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(undefined))
      return await client.cw20Balances(...params)
    },
})
export const cw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['cw20TokenList']>
  }
>({
  key: 'daoCoreV2Cw20TokenList',
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
    params: Parameters<DaoCoreV2QueryClient['cw721TokenList']>
  }
>({
  key: 'daoCoreV2Cw721TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.cw721TokenList(...params)
    },
})
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
      const client = get(queryClient(queryClientParams))
      try {
        return await client.dumpState(...params)
      } catch (err) {
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
      const client = get(queryClient(queryClientParams))
      return await client.getItem(...params)
    },
})
export const listItemsSelector = selectorFamily<
  ListItemsResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['listItems']>
  }
>({
  key: 'daoCoreV2ListItems',
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
      const client = get(queryClient(queryClientParams))
      return await client.votingModule(...params)
    },
})
export const listSubDaosSelector = selectorFamily<
  ListSubDaosResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['listSubDaos']>
  }
>({
  key: 'daoCoreV2ListSubDaos',
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
      const client = get(queryClient(queryClientParams))
      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))
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
      const client = get(queryClient(queryClientParams))
      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))
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
  (Cw20BalancesResponse[number] & {
    isGovernanceToken: boolean
    info: TokenInfoResponse
  })[],
  QueryClientParams & {
    governanceTokenAddress?: string
  }
>({
  key: 'daoCoreV2AllCw20Balances',
  get:
    ({ governanceTokenAddress, ...queryClientParams }) =>
    async ({ get }) => {
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

      //! Get all balances.
      const balances: Cw20BalancesResponse = []
      while (true) {
        const response = await get(
          cw20BalancesSelector({
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

      return balances.map((balance, index) => ({
        ...balance,
        info: infos[index],
        isGovernanceToken:
          !!governanceTokenAddress && governanceTokenAddress === balance.addr,
      }))
    },
})

export const cw20BalancesInfoSelector = selectorFamily<
  {
    symbol: string
    denom: string
    amount: string
    decimals: number
    imageUrl: string | undefined
    isGovernanceToken: boolean
  }[],
  QueryClientParams & {
    governanceTokenAddress?: string
  }
>({
  key: 'daoCoreV2Cw20BalancesInfo',
  get:
    ({ governanceTokenAddress, ...queryClientParams }) =>
    async ({ get }) => {
      const cw20List = get(
        allCw20BalancesAndInfosSelector({
          ...queryClientParams,
          governanceTokenAddress,
        })
      )

      const cw20Info = get(
        waitForAll(
          cw20List.map(({ addr }) =>
            Cw20BaseSelectors.tokenInfoSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: addr,
              params: [],
            })
          )
        )
      ).filter(Boolean) as TokenInfoResponse[]

      const cw20MarketingInfo = get(
        waitForAll(
          cw20List.map(({ addr }) =>
            Cw20BaseSelectors.marketingInfoSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: addr,
              params: [],
            })
          )
        )
      )

      return cw20Info.map(({ symbol, decimals }, idx) => {
        const {
          addr: denom,
          balance: amount,
          isGovernanceToken,
        } = cw20List[idx]
        const logoInfo = cw20MarketingInfo[idx].logo

        return {
          symbol,
          denom,
          amount,
          decimals,
          imageUrl:
            !!logoInfo && logoInfo !== 'embedded' && 'url' in logoInfo
              ? logoInfo.url
              : undefined,
          isGovernanceToken,
        }
      })
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

const SUBDAO_LIST_LIMIT = 30
export const listAllSubDaosSelector = selectorFamily<
  ListSubDaosResponse,
  QueryClientParams
>({
  key: 'daoCoreV2ListAllSubDaos',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const subdaos: ListSubDaosResponse = []

      while (true) {
        const response = await get(
          listSubDaosSelector({
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
      const items: ListItemsResponse = []

      while (true) {
        const response = await get(
          listItemsSelector({
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
