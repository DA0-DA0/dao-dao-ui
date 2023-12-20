import { useCachedLoading, useChain } from '@dao-dao/stateless'
import { Entity, EntityType, LoadingData } from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

import { entitySelector } from '../recoil'

// Supports wallets from any chain and DAOs from the current chain or DAOs from
// another chain with a polytone account on the current chain.
export const useEntity = (address: string): LoadingData<Entity> => {
  const { chain_id: chainId } = useChain()

  return useCachedLoading(
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
    }
  )
}
