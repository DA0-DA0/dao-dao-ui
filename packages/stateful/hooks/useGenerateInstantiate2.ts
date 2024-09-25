import { useQueryClient } from '@tanstack/react-query'

import { contractQueries } from '@dao-dao/state/query'
import { LoadingDataWithError } from '@dao-dao/types'
import { isSecretNetwork } from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from './query'

export type UseGenerateInstantiate2Options = {
  chainId: string
  creator: string
  codeId: number
  salt: string
}

/**
 * This hook generates a predictable address for a contract.
 */
export const useGenerateInstantiate2 = ({
  chainId,
  creator,
  codeId,
  salt,
}: UseGenerateInstantiate2Options): LoadingDataWithError<string> => {
  const queryClient = useQueryClient()
  return useQueryLoadingDataWithError(
    chainId &&
      creator &&
      codeId &&
      !isNaN(codeId) &&
      codeId > 0 &&
      // Instantiate2 not supported on Secret Network, so just don't load.
      !isSecretNetwork(chainId)
      ? contractQueries.instantiate2Address(queryClient, {
          chainId,
          creator,
          codeId,
          salt,
        })
      : undefined
  )
}
