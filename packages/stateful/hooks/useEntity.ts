import { DaoCoreV2Selectors } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { Entity, EntityType, LoadingData, WithChainId } from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  getFallbackImage,
  isValidContractAddress,
} from '@dao-dao/utils'

import { useWalletProfile } from './useWalletProfile'

export type UseEntityOptions = WithChainId<{
  address: string
}>

export const useEntity = ({
  address,
  chainId,
}: UseEntityOptions): LoadingData<Entity> => {
  // Try to load config assuming the address is a DAO.
  const daoConfig = useCachedLoadable(
    address && isValidContractAddress(address, CHAIN_BECH32_PREFIX)
      ? DaoCoreV2Selectors.configSelector({
          contractAddress: address,
          chainId,
          params: [],
        })
      : undefined
  )

  // Try loading wallet profile assuming the address is a wallet.
  const walletProfile = useWalletProfile({
    walletAddress: address,
  })

  return daoConfig.state !== 'hasValue' && walletProfile.profile.loading
    ? { loading: true }
    : {
        loading: false,
        data: {
          type:
            daoConfig.state === 'hasValue' ? EntityType.Dao : EntityType.Wallet,
          address,
          name:
            daoConfig.state === 'hasValue'
              ? daoConfig.contents.name
              : !walletProfile.profile.loading
              ? walletProfile.profile.data.name
              : null,
          imageUrl:
            (daoConfig.state === 'hasValue'
              ? daoConfig.contents.image_url
              : !walletProfile.profile.loading
              ? walletProfile.profile.data.imageUrl
              : undefined) || getFallbackImage(address),
        },
      }
}
