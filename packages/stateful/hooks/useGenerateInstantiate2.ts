import { instantiate2Address } from '@cosmjs/cosmwasm-stargate'
import { toUtf8 } from '@cosmjs/encoding'

import { contractQueries } from '@dao-dao/state/query'
import { LoadingDataWithError } from '@dao-dao/types'
import { getChainForChainId, isSecretNetwork } from '@dao-dao/utils'

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
  const chain = getChainForChainId(chainId)

  // Load checksum of the contract code.
  return useQueryLoadingDataWithError(
    chainId &&
      creator &&
      codeId &&
      // Instantiate2 not supported on Secret Network, so just don't load.
      !isSecretNetwork(chainId)
      ? contractQueries.codeInfo({
          chainId,
          codeId,
        })
      : undefined,
    ({ dataHash }) =>
      instantiate2Address(dataHash, creator, toUtf8(salt), chain.bech32_prefix)
  )
}
