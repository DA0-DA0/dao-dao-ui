import { fromBech32 } from '@cosmjs/encoding'
import { useMemo } from 'react'

import { useCachedLoading, useChain } from '@dao-dao/stateless'
import { Entity, EntityType, LoadingData } from '@dao-dao/types'
import {
  getConfiguredChains,
  getFallbackImage,
  makeEmptyUnifiedProfile,
} from '@dao-dao/utils'

import { entitySelector } from '../recoil'

export type UseEntityReturn = {
  /**
   * The chain ID detected for the address based on its prefix.
   */
  chainId: string
  /**
   * The entity for the address on the detected chain.
   */
  entity: LoadingData<Entity>
}

/**
 * Fetch entity for the given address. Attempts to autodetect the chain based on
 * the address prefix, which means it should load entities for wallets and DAOs
 * from any chain. It should even correctly load a DAO given a cross-chain
 * (polytone) account address.
 */
export const useEntity = (address: string): UseEntityReturn => {
  const { chain_id: currentChainId, bech32_prefix: currentBech32Prefix } =
    useChain()
  const chainId = useMemo(() => {
    try {
      const prefix = fromBech32(address).prefix
      if (prefix === currentBech32Prefix) {
        return currentChainId
      }

      // If prefix mismatch, try to find matching chain for prefix and use that
      // one instead.
      const matchingChainId = getConfiguredChains().find(
        ({ chain }) => chain.bech32_prefix === prefix
      )?.chainId

      if (matchingChainId) {
        return matchingChainId
      }
    } catch {}

    return currentChainId
  }, [address, currentBech32Prefix, currentChainId])

  const entity = useCachedLoading(
    address
      ? entitySelector({
          chainId,
          address,
        })
      : undefined,
    // Should never error as it uses loadables internally.
    {
      type: EntityType.Wallet,
      chainId,
      address,
      name: null,
      imageUrl: getFallbackImage(address),
      profile: makeEmptyUnifiedProfile(chainId, address),
    }
  )

  return {
    chainId,
    entity,
  }
}
