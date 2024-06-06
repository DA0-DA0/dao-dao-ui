import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import { useUpdatingRef } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'

/**
 * Transform react-query results into our LoadingData object that components
 * use.
 */
export const useQueryLoadingData = <T extends unknown>(
  /**
   * Query options to passthrough to useQuery.
   */
  options: Omit<Parameters<typeof useQuery<T, Error, T, any>>[0], 'select'>,
  /**
   * Default value in case of an error.
   */
  defaultValue: T,
  /**
   * Optionally call a function on error.
   */
  onError?: (error: Error) => void
): LoadingData<T> => {
  const { isPending, isError, isRefetching, data, error } = useQuery(options)

  const onErrorRef = useUpdatingRef(onError)

  // Use deep compare to prevent memoize on every re-render if an object is
  // passed as the default value.
  const memoizedDefaultValue = useDeepCompareMemoize(defaultValue)

  return useMemo((): LoadingData<T> => {
    if (isPending) {
      return {
        loading: true,
      }
    } else if (isError) {
      onErrorRef.current?.(error)
      return {
        loading: false,
        data: memoizedDefaultValue,
      }
    } else {
      return {
        loading: false,
        updating: isRefetching,
        data,
      }
    }
  }, [
    isPending,
    isError,
    onErrorRef,
    error,
    memoizedDefaultValue,
    isRefetching,
    data,
  ])
}
