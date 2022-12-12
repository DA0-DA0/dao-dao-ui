import { DaoCoreV2Selectors } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { LoadingData, Profile, WithChainId } from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  getFallbackImage,
  isValidContractAddress,
} from '@dao-dao/utils'

import { useWalletProfile } from './useWalletProfile'

export type UseProfileOptions = WithChainId<{
  address: string
  // Optionally allow specifying wallet public key if known, since it's faster.
  // With just an address, we have to query the chain for the public key.
  walletHexPublicKey?: string
}>

export const useProfile = ({
  address,
  walletHexPublicKey,
  chainId,
}: UseProfileOptions): LoadingData<Profile> => {
  // Try to load config assuming the address is a DAO.
  const daoConfig = useCachedLoadable(
    // If we have a wallet public key, we can skip the contract query.
    !walletHexPublicKey &&
      address &&
      isValidContractAddress(address, CHAIN_BECH32_PREFIX)
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
    // hexPublicKey is faster and only applies to wallets.
    hexPublicKey: walletHexPublicKey,
  })

  return daoConfig.state !== 'hasValue' && walletProfile.profile.loading
    ? { loading: true }
    : {
        loading: false,
        data: {
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
