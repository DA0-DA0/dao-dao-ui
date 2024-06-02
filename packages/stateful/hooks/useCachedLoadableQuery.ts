import { QueryKey, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { CachedLoadable } from '@dao-dao/types'

/**
 * Transform react-query query results into a cached loadable object that
 * components expect.
 */
export const useCachedLoadableQuery = <
  TQueryFnData extends unknown,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<
    Parameters<
      typeof useQuery<TQueryFnData, Error, TQueryFnData, TQueryKey>
    >[0],
    'select'
  >
): CachedLoadable<TQueryFnData> => {
  const { isPending, isError, isRefetching, data, error } = useQuery(options)

  return useMemo((): CachedLoadable<TQueryFnData> => {
    if (isPending) {
      return {
        state: 'loading',
        contents: undefined,
      }
    } else if (isError) {
      return {
        state: 'hasError',
        contents: error,
      }
    } else {
      return {
        state: 'hasValue',
        contents: data,
        updating: isRefetching,
      }
    }
  }, [isPending, isError, isRefetching, data, error])
}
