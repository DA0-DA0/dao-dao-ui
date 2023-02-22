import { constSelector, useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { Entity, EntityType, LoadingData, WithChainId } from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  getFallbackImage,
  isValidContractAddress,
  isValidWalletAddress,
} from '@dao-dao/utils'

import { walletProfileDataSelector } from '../recoil'

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

  const walletProfileData = useRecoilValue(
    address && isValidWalletAddress(address, CHAIN_BECH32_PREFIX)
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
