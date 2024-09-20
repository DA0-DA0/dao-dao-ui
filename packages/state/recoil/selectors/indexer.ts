import Pusher from 'pusher-js'
import { selector, selectorFamily, waitForAllSettled } from 'recoil'

import {
  Expiration,
  IndexerFormulaType,
  IndexerUpStatus,
  WithChainId,
} from '@dao-dao/types'
import {
  CommonError,
  WEB_SOCKET_PUSHER_APP_KEY,
  WEB_SOCKET_PUSHER_HOST,
  WEB_SOCKET_PUSHER_PORT,
  getSupportedChains,
} from '@dao-dao/utils'

import {
  DaoProposalSearchResult,
  DaoSearchResult,
  QueryIndexerOptions,
  QuerySnapperOptions,
  SearchDaoProposalsOptions,
  SearchDaosOptions,
  getRecentDaoProposals,
  loadMeilisearchClient,
  queryIndexer,
  queryIndexerUpStatus,
  querySnapper,
  searchDaos,
} from '../../indexer'
import {
  refreshIndexerUpStatusAtom,
  refreshOpenProposalsAtom,
  refreshWalletProposalStatsAtom,
} from '../atoms'

export type QueryIndexerParams = QueryIndexerOptions & {
  /**
   * Refresh by changing this value.
   */
  id?: number
  /**
   * If there is no fallback query available, still query even if indexer is
   * behind. Defaults to `false`.
   */
  noFallback?: boolean
}

export const queryIndexerSelector = selectorFamily<any, QueryIndexerParams>({
  key: 'queryIndexer',
  get:
    (options) =>
    async ({ get }) => {
      try {
        const indexerUp = get(
          indexerUpStatusSelector({
            chainId: options.chainId,
            // Don't refresh this automatically on a period, since some
            // selectors that are not cached will use this, and they will cause
            // annoying flickering in the UI. Ideally, we replace all
            // `useRecoilValue` blocking hooks with `useCachedLoadingWithError`
            // hooks that cache data during updates. Once that happens, we can
            // remove this. But that might not happen for a while...
            noRefresh: true,
            // Manually refresh.
            id: options.id,
          })
        )

        // If indexer is behind and there is a fallback, return null.
        if (!indexerUp.caughtUp && !options.noFallback) {
          return null
        }
      } catch (err) {
        // If no indexer for chain, return null.
        if (
          err instanceof Error &&
          err.message === CommonError.NoIndexerForChain
        ) {
          return null
        }

        // Recoil throws promises when waiting for other selectors to finish,
        // and we don't want to prevent that.
        if (err instanceof Promise) {
          throw err
        }

        console.error(err)
        return null
      }

      try {
        return await queryIndexer(options)
      } catch (err) {
        console.error(err)

        return null
      }
    },
})

export const indexerUpStatusSelector = selectorFamily<
  IndexerUpStatus,
  WithChainId<{
    /**
     * If true, does not refresh the indexer status. Defaults to false. This is
     * useful if you want to check the indexer status one time. The refresh
     * occurs periodically to update status on the status page.
     */
    noRefresh?: boolean
    /**
     * Change this value to manually refresh.
     */
    id?: number
  }>
>({
  key: 'indexerUpStatus',
  get:
    ({ noRefresh = false, ...params }) =>
    async ({ get }) => {
      if (!noRefresh) {
        get(refreshIndexerUpStatusAtom)
      }

      return await queryIndexerUpStatus(params)
    },
})

export const queryAccountIndexerSelector = selectorFamily<
  any,
  Omit<QueryIndexerParams, 'type' | 'address'> & {
    walletAddress: string
  }
>({
  key: 'queryAccountIndexer',
  get:
    ({ walletAddress: address, ...params }) =>
    ({ get }) =>
      get(
        queryIndexerSelector({
          type: IndexerFormulaType.Account,
          address,
          ...params,
        })
      ),
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

export type QuerySnapperParams = QuerySnapperOptions & {
  // Refresh by changing this value.
  id?: number
}

export const querySnapperSelector = selectorFamily<any, QuerySnapperParams>({
  key: 'querySnapper',
  get: (options) => async () => await querySnapper(options),
})

export const searchDaosSelector = selectorFamily<
  DaoSearchResult[],
  SearchDaosOptions
>({
  key: 'searchDaos',
  get: (options) => async () => await searchDaos(options),
})

/**
 * Get recent DAO proposals for a chain.
 */
export const chainRecentDaoProposalsSelector = selectorFamily<
  DaoProposalSearchResult[],
  SearchDaoProposalsOptions
>({
  key: 'chainRecentDaoProposals',
  get: (options) => async () => await getRecentDaoProposals(options),
})

/**
 * Get recent DAO proposals across all supported chains.
 */
export const recentDaoProposalsSelector = selectorFamily<
  DaoProposalSearchResult[],
  Omit<SearchDaoProposalsOptions, 'chainId'>
>({
  key: 'recentDaoProposals',
  get:
    (options) =>
    async ({ get }) => {
      const chains = getSupportedChains({ hasIndexer: true })

      // Get options.limit most recent across all chains by getting
      // options.limit most recent per-chain, sorting, and then slicing only the
      // first options.limit.
      const all = get(
        waitForAllSettled(
          chains.map(({ chainId }) =>
            chainRecentDaoProposalsSelector({
              ...options,
              chainId,
            })
          )
        )
      )
        .flatMap((loadable) => loadable.valueMaybe() || [])
        // Most recent first.
        .sort(
          (a, b) =>
            b.value.proposal.start_height - a.value.proposal.start_height
        )
        // Get N most recent across all chains.
        .slice(0, options.limit)

      return all
    },
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
          noFallback: true,
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
        queryAccountIndexerSelector({
          walletAddress: address,
          formula: 'proposals/stats',
          chainId,
          id,
          noFallback: true,
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
