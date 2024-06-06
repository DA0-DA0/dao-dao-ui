import { QueryKey, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useUpdatingRef } from '@dao-dao/stateless'
import { LoadingDataWithError } from '@dao-dao/types'

/**
 * Transform react-query results into our LoadingDataWithError abstraction that
 * components use.
 */
export const useQueryLoadingDataWithError = <
  TQueryFnData extends unknown,
  TQueryKey extends QueryKey = QueryKey,
  TTransformedData extends unknown = TQueryFnData
>(
  /**
   * Query options to passthrough to useQuery.
   */
  options: Omit<
    Parameters<
      typeof useQuery<TQueryFnData, Error, TQueryFnData, TQueryKey>
    >[0],
    'select'
  >,
  /**
   * Optional function to transform the data.
   */
  transform?: (data: TQueryFnData) => TTransformedData
): LoadingDataWithError<TTransformedData> => {
  const { isPending, isError, isRefetching, data, error } = useQuery(options)
  const transformRef = useUpdatingRef(transform)

  return useMemo((): LoadingDataWithError<TTransformedData> => {
    if (isPending) {
      return {
        loading: true,
        errored: false,
      }
    } else if (isError) {
      return {
        loading: false,
        errored: true,
        error,
      }
    } else {
      return {
        loading: false,
        errored: false,
        updating: isRefetching,
        data: transformRef.current
          ? transformRef.current(data)
          : (data as unknown as TTransformedData),
      }
    }
  }, [isPending, isError, isRefetching, data, error, transformRef])
}
