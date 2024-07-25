import { useQueries, useQueryClient } from '@tanstack/react-query'

import { tokenQueries } from '@dao-dao/state/query'
import {
  GenericToken,
  GenericTokenSource,
  LoadingDataWithError,
} from '@dao-dao/types'
import { makeCombineQueryResultsIntoLoadingDataWithError } from '@dao-dao/utils'

/**
 * Query a list of tokens, waiting for all and erroring if any fails to load.
 *
 * The return value is *not* memoized.
 */
export const useQueryTokens = (
  /**
   * The token sources to query. If undefined, will return an empty list.
   */
  tokens?: GenericTokenSource[]
): LoadingDataWithError<GenericToken[]> => {
  const queryClient = useQueryClient()
  return useQueries({
    queries:
      tokens?.map((token) => tokenQueries.info(queryClient, token)) || [],
    combine: makeCombineQueryResultsIntoLoadingDataWithError(),
  })
}
