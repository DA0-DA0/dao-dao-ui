import { instantiate2Address } from '@cosmjs/cosmwasm-stargate'
import { fromHex, toUtf8 } from '@cosmjs/encoding'

import { codeDetailsSelector } from '@dao-dao/state/recoil'
import { useCachedLoadingWithError } from '@dao-dao/stateless'
import { LoadingDataWithError } from '@dao-dao/types'
import { getChainForChainId } from '@dao-dao/utils'

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

  return useCachedLoadingWithError(
    // Load checksum of the contract code.
    codeDetailsSelector({
      chainId,
      codeId,
    }),
    (data) =>
      instantiate2Address(
        fromHex(data.checksum),
        creator,
        toUtf8(salt),
        chain.bech32_prefix
      )
  )
}
