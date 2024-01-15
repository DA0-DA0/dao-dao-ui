import Pusher from 'pusher-js'
import { atom, selector, selectorFamily } from 'recoil'

import {
  Expiration,
  IndexerFormulaType,
  IndexerUpStatus,
  WithChainId,
} from '@dao-dao/types'
import {
  CommonError,
  NUM_FEATURED_DAOS,
  WEB_SOCKET_PUSHER_APP_KEY,
  WEB_SOCKET_PUSHER_HOST,
  WEB_SOCKET_PUSHER_PORT,
  getSupportedChainConfig,
} from '@dao-dao/utils'

import {
  DaoSearchResult,
  QueryIndexerOptions,
  SearchDaosOptions,
  loadMeilisearchClient,
  queryIndexer,
  queryIndexerUpStatus,
  searchDaos,
} from '../../indexer'
import {
  refreshIndexerUpStatusAtom,
  refreshOpenProposalsAtom,
  refreshWalletProposalStatsAtom,
} from '../atoms'

export type QueryIndexerParams = QueryIndexerOptions & {
  // Refresh by changing this value.
  id?: number
}

export const queryIndexerSelector = selectorFamily<any, QueryIndexerParams>({
  key: 'queryIndexer',
  get: (options) => async () => {
    try {
      return await queryIndexer(options)
    } catch (err) {
      // If the indexer fails, return null since many indexer queries fallback
      // to the chain. If an error other than no indexer for chain, log it.
      if (
        !(err instanceof Error) ||
        err.message !== CommonError.NoIndexerForChain
      ) {
        console.error(err)
      }

      return null
    }
  },
})

export const indexerUpStatusSelector = selectorFamily<
  IndexerUpStatus,
  WithChainId<{}>
>({
  key: 'indexerUpStatus',
  get:
    (params) =>
    async ({ get }) => {
      get(refreshIndexerUpStatusAtom)

      return await queryIndexerUpStatus(params)
    },
})

export const queryContractIndexerSelector = selectorFamily<
  any,
  Omit<QueryIndexerParams, 'type' | 'address'> & {
    contractAddress: string
  }
>({
  key: 'queryContractIndexer',
  get:
    ({ contractAddress: address, ...params }) =>
    ({ get }) =>
      get(
        queryIndexerSelector({
          type: IndexerFormulaType.Contract,
          address,
          ...params,
        })
      ),
})

export const queryGenericIndexerSelector = selectorFamily<
  any,
  Omit<QueryIndexerParams, 'type' | 'address'>
>({
  key: 'queryGenericIndexer',
  get:
    (params) =>
    ({ get }) =>
      get(
        queryIndexerSelector({
          type: IndexerFormulaType.Generic,
          ...params,
        })
      ),
})

export const queryValidatorIndexerSelector = selectorFamily<
  any,
  Omit<QueryIndexerParams, 'type' | 'address'> & {
    validatorOperatorAddress: string
  }
>({
  key: 'queryValidatorIndexer',
  get:
    ({ validatorOperatorAddress: address, ...params }) =>
    ({ get }) =>
      get(
        queryIndexerSelector({
          type: IndexerFormulaType.Validator,
          address,
          ...params,
        })
      ),
})
export const queryWalletIndexerSelector = selectorFamily<
  any,
  Omit<QueryIndexerParams, 'type' | 'address'> & {
    walletAddress: string
  }
>({
  key: 'queryWalletIndexer',
  get:
    ({ walletAddress: address, ...params }) =>
    ({ get }) =>
      get(
        queryIndexerSelector({
          type: IndexerFormulaType.Wallet,
          address,
          ...params,
        })
      ),
})

export const searchDaosSelector = selectorFamily<
  DaoSearchResult[],
  SearchDaosOptions
>({
  key: 'searchDaos',
  get: (options) => async () => await searchDaos(options),
})

export const openProposalsSelector = selectorFamily<
  {
    proposalModuleAddress: string
    proposals: {
      id: number
      proposal: { start_height: number; expiration: Expiration }
      voted?: boolean
    }[]
  }[],
  WithChainId<{ coreAddress: string; address?: string }>
>({
  key: 'openProposals',
  get:
    ({ coreAddress, chainId, address }) =>
    ({ get }) => {
      const id = get(refreshOpenProposalsAtom)
      const openProposals = get(
        queryContractIndexerSelector({
          contractAddress: coreAddress,
          formula: 'daoCore/openProposals',
          chainId,
          id,
          args: { address },
        })
      )
      return openProposals ?? []
    },
})

export const walletProposalStatsSelector = selectorFamily<
  {
    created: number
    votesCast: number
  },
  WithChainId<{ address: string }>
>({
  key: 'walletProposalStats',
  get:
    ({ address, chainId }) =>
    ({ get }) => {
      const id = get(refreshWalletProposalStatsAtom)
      const stats = get(
        queryWalletIndexerSelector({
          walletAddress: address,
          formula: 'proposals/stats',
          chainId,
          id,
        })
      )

      return (
        stats || {
          created: 0,
          votesCast: 0,
        }
      )
    },
})

export const walletAdminOfDaosSelector = selectorFamily<
  string[],
  WithChainId<{ walletAddress: string }>
>({
  key: 'walletAdminOfDaos',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      const walletAdminOfDaos: string[] = get(
        queryWalletIndexerSelector({
          chainId,
          walletAddress,
          formula: 'daos/adminOf',
        })
      )

      return walletAdminOfDaos && Array.isArray(walletAdminOfDaos)
        ? walletAdminOfDaos
        : []
    },
})

export const indexerWebSocketChannelSubscriptionsAtom = atom<
  Partial<Record<string, number>>
>({
  key: 'indexerWebSocketChannelSubscriptions',
  default: {},
})

export const indexerWebSocketSelector = selector({
  key: 'indexerWebSocket',
  get: () =>
    new Pusher(WEB_SOCKET_PUSHER_APP_KEY, {
      wsHost: WEB_SOCKET_PUSHER_HOST,
      wsPort: WEB_SOCKET_PUSHER_PORT,
      wssPort: WEB_SOCKET_PUSHER_PORT,
      forceTLS: true,
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
      disabledTransports: ['sockjs', 'xhr_streaming', 'xhr_polling'],
    }),
  // Client must be internally mutable.
  dangerouslyAllowMutability: true,
})

export const indexerMeilisearchClientSelector = selector({
  key: 'indexerMeilisearchClient',
  get: () => loadMeilisearchClient(),
  dangerouslyAllowMutability: true,
})

// Top 10 featured DAOs by TVL with certain conditions.
export const indexerFeaturedDaosSelector = selectorFamily<
  {
    address: string
    tvl: number
  }[],
  string
>({
  key: 'indexerFeaturedDaos',
  get:
    (chainId) =>
    async ({ get }) => {
      const config = getSupportedChainConfig(chainId)
      if (!config) {
        return []
      }

      const priorityFeaturedDaos: string[] =
        get(
          queryGenericIndexerSelector({
            chainId,
            formula: 'priorityFeaturedDaos',
          })
        ) || []

      const client = get(indexerMeilisearchClientSelector)
      const index = client.index(config.indexes.featured)

      let hits: {
        contractAddress: string
        value: { tvl: number }
      }[] = []
      try {
        hits = (
          await index.search<{
            contractAddress: string
            value: { tvl: number }
          }>(null, {
            limit: NUM_FEATURED_DAOS,
            filter: [
              'value.daysSinceLastProposalPassed >= 0',
              'value.daysSinceLastProposalPassed <= 90',
              'value.giniCoefficient >= 0',
              'value.giniCoefficient < 0.75',
              'value.memberCount >= 3',
              // Exclude priority.
              ...(priorityFeaturedDaos.length > 0
                ? [
                    `NOT contractAddress IN ["${priorityFeaturedDaos.join(
                      '", "'
                    )}"]`,
                  ]
                : []),
            ],
            sort: ['value.tvl:desc'],
          })
        ).hits
      } catch (err) {
        console.error(err)
      }

      const featuredDaos = [
        // Insert priority DAOs first.
        ...priorityFeaturedDaos.map((address) => ({
          address,
          // Rank first.
          tvl: Infinity,
        })),
        ...hits.map((hit) => ({
          address: hit.contractAddress,
          tvl: hit.value.tvl,
        })),
      ]

      return featuredDaos
    },
})
