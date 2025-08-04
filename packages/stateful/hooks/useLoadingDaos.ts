import { useQueries } from '@tanstack/react-query'

import { daoQueries } from '@dao-dao/state/query'
import {
  DaoInfo,
  DaoSource,
  LazyDaoCardProps,
  LoadingData,
  LoadingDataWithError,
  StatefulDaoCardProps,
} from '@dao-dao/types'
import {
  makeCombineQueryResultsIntoLoadingData,
  makeCombineQueryResultsIntoLoadingDataWithError,
} from '@dao-dao/utils'

import { useQueryLoadingData } from './query/useQueryLoadingData'
import { useFollowingDaos } from './useFollowingDaos'

export const useLoadingDaos = (
  daos: LoadingData<DaoSource[]>,
  alphabetize = false
): LoadingData<DaoInfo[]> => {
  return useQueries({
    queries: daos.loading
      ? []
      : daos.data.map(({ chainId, coreAddress }) =>
          daoQueries.info({
            chainId,
            coreAddress,
          })
        ),
    combine: makeCombineQueryResultsIntoLoadingData<DaoInfo>({
      transform: (infos) =>
        infos.sort((a, b) => (alphabetize ? a.name.localeCompare(b.name) : 0)),
    }),
  })
}

/**
 * Load lazy DAO card props.
 */
export const useLoadingLazyDaos = (
  daos: LoadingData<DaoSource[]> | LoadingDataWithError<DaoSource[]>,
  alphabetize = false
): LoadingDataWithError<LazyDaoCardProps[]> => {
  return useQueries({
    queries:
      daos.loading || ('errored' in daos && daos.errored)
        ? []
        : daos.data.map(({ chainId, coreAddress }) =>
            daoQueries.lazyDaoCardProps({
              chainId,
              coreAddress,
            })
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      // If DAOs are loading, show loading until all are loaded. If DAOs
      // errored, do not show loading.
      loadIfNone: daos.loading,
      firstLoad: 'one',
      errorIf: 'all',
      transform: (infos) =>
        infos.sort((a, b) =>
          alphabetize ? a.info.name.localeCompare(b.info.name) : 0
        ),
    }),
  })
}

export const useLoadingFeaturedDaoCards = (
  /**
   * If passed, only load DAOs from this chain. Otherwise, load from all chains.
   */
  chainId?: string
): LoadingData<StatefulDaoCardProps[]> => {
  const featuredDaos = useQueryLoadingData(
    daoQueries.listFeatured(),
    [] as DaoSource[]
  )

  const daos = useLoadingDaos(
    featuredDaos.loading
      ? { loading: true }
      : !featuredDaos.data
        ? { loading: false, data: [] }
        : {
            loading: false,
            data: featuredDaos.data.filter(
              (featured) => !chainId || featured.chainId === chainId
            ),
          }
  )

  return daos.loading
    ? daos
    : {
        loading: false,
        updating: daos.updating,
        data: daos.data.map(
          (info): StatefulDaoCardProps => ({
            info,
          })
        ),
      }
}

export const useLoadingFollowingDaos = (
  // If passed, will only load DAOs from this chain. Otherwise, will load from
  // all chains.
  chainId?: string
): LoadingData<DaoInfo[]> => {
  const { following } = useFollowingDaos()

  return useLoadingDaos(
    following.loading
      ? { loading: true }
      : following.errored
        ? { loading: false, data: [] }
        : {
            loading: false,
            data: following.data.filter(
              (f) => !chainId || f.chainId === chainId
            ),
          },
    // Alphabetize.
    true
  )
}
