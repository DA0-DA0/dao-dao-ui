import { constSelector, useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import {
  useCachedLoadable,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { Entity, EntityType, LoadingData } from '@dao-dao/types'
import {
  getFallbackImage,
  isValidContractAddress,
  isValidWalletAddress,
} from '@dao-dao/utils'

import { walletProfileDataSelector } from '../recoil'

// Supports wallets from any chain and DAOs from the current chain or DAOs from
// another chain with a polytone account on the current chain.
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

  // Try to load config assuming the address is a polytone proxy of a DAO.
  const daoConfigFromPolytoneProxy = useCachedLoading(
    address && isValidContractAddress(address, bech32Prefix)
      ? DaoCoreV2Selectors.configFromPolytoneProxySelector({
          proxy: address,
          chainId,
        })
      : undefined,
    undefined
  )

  const walletProfileData = useRecoilValue(
    address && isValidWalletAddress(address)
      ? walletProfileDataSelector({
          address,
          chainId,
        })
      : constSelector(undefined)
  )

  const actualAddress =
    !daoConfigFromPolytoneProxy.loading && daoConfigFromPolytoneProxy.data
      ? daoConfigFromPolytoneProxy.data.coreAddress
      : address

  return daoConfig.state !== 'hasValue' &&
    daoConfigFromPolytoneProxy.loading &&
    (!walletProfileData || walletProfileData.loading)
    ? { loading: true }
    : {
        loading: false,
        data: {
          type:
            daoConfig.state === 'hasValue' ||
            (!daoConfigFromPolytoneProxy.loading &&
              daoConfigFromPolytoneProxy.data)
              ? EntityType.Dao
              : EntityType.Wallet,
          chainId:
            !daoConfigFromPolytoneProxy.loading &&
            daoConfigFromPolytoneProxy.data
              ? daoConfigFromPolytoneProxy.data.chainId
              : chainId,
          address: actualAddress,
          name:
            daoConfig.state === 'hasValue'
              ? daoConfig.contents.name
              : !daoConfigFromPolytoneProxy.loading &&
                daoConfigFromPolytoneProxy.data
              ? daoConfigFromPolytoneProxy.data.config.name
              : walletProfileData && !walletProfileData.loading
              ? walletProfileData.profile.name
              : null,
          imageUrl:
            (daoConfig.state === 'hasValue'
              ? daoConfig.contents.image_url
              : !daoConfigFromPolytoneProxy.loading &&
                daoConfigFromPolytoneProxy.data
              ? daoConfigFromPolytoneProxy.data.config.image_url
              : walletProfileData && !walletProfileData.loading
              ? walletProfileData.profile.imageUrl
              : undefined) ||
            // Use actual address for fallback image, even if polytone account,
            // so the fallback image stays consistent.
            getFallbackImage(actualAddress),
        },
      }
}
