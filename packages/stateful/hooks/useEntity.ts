import { constSelector, useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { useCachedLoadable, useChain } from '@dao-dao/stateless'
import { Entity, EntityType, LoadingData } from '@dao-dao/types'
import {
  getFallbackImage,
  isValidContractAddress,
  isValidWalletAddress,
} from '@dao-dao/utils'

import { walletProfileDataSelector } from '../recoil'

export const useEntity = (address: string): LoadingData<Entity> => {
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()

  // Try to load config assuming the address is a DAO.
  const daoConfig = useCachedLoadable(
    address && isValidContractAddress(address, bech32Prefix)
      ? DaoCoreV2Selectors.configSelector({
          contractAddress: address,
          chainId,
          params: [],
        })
      : undefined
  )

  const walletProfileData = useRecoilValue(
    address && isValidWalletAddress(address, bech32Prefix)
      ? walletProfileDataSelector({
          address,
          chainId,
        })
      : constSelector(undefined)
  )

  return daoConfig.state !== 'hasValue' &&
    (!walletProfileData || walletProfileData.loading)
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
              : walletProfileData && !walletProfileData.loading
              ? walletProfileData.profile.name
              : null,
          imageUrl:
            (daoConfig.state === 'hasValue'
              ? daoConfig.contents.image_url
              : walletProfileData && !walletProfileData.loading
              ? walletProfileData.profile.imageUrl
              : undefined) || getFallbackImage(address),
        },
      }
}
