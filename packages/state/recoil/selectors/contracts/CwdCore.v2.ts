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
} from '@dao-dao/types/contracts/CwdCore.v2'

import { Cw20BaseSelectors } from '.'
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
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const cw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['cw20Balances']>
  }
>({
  key: 'cwdCoreV2Cw20Balances',
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
    params: Parameters<CwdCoreV2QueryClient['cw20TokenList']>
  }
>({
  key: 'cwdCoreV2Cw20TokenList',
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
    params: Parameters<CwdCoreV2QueryClient['cw721TokenList']>
  }
>({
  key: 'cwdCoreV2Cw721TokenList',
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
    params: Parameters<CwdCoreV2QueryClient['dumpState']>
  }
>({
  key: 'cwdCoreV2DumpState',
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
    params: Parameters<CwdCoreV2QueryClient['getItem']>
  }
>({
  key: 'cwdCoreV2GetItem',
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
    params: Parameters<CwdCoreV2QueryClient['listItems']>
  }
>({
  key: 'cwdCoreV2ListItems',
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
      const client = get(queryClient(queryClientParams))
      return await client.votingModule(...params)
    },
})
export const listSubDaosSelector = selectorFamily<
  ListSubDaosResponse,
  QueryClientParams & {
    params: Parameters<CwdCoreV2QueryClient['listSubDaos']>
  }
>({
  key: 'cwdCoreV2ListSubDaos',
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
      const client = get(queryClient(queryClientParams))
      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))
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
      const client = get(queryClient(queryClientParams))
      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))
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
  key: 'cwdCoreV2AllCw20Balances',
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
  key: 'cwdCoreV2Cw20BalancesInfo',
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
  key: 'cwdCoreV2AllCw721TokenList',
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
  key: 'cwdCoreV2ListAllSubDaos',
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
