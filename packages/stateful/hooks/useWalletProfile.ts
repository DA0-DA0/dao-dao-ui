import { keplrProfileImageSelector } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { LoadingData, WalletProfile, WithChainId } from '@dao-dao/types'
import {
  getFallbackImage,
  loadableToLoadingData,
  toBech32Hash,
} from '@dao-dao/utils'

import {
  EMPTY_PFPK_PROFILE,
  pfpkProfileSelector,
} from '../recoil/selectors/profile'

export type UseWalletProfileOptions = WithChainId<{
  walletAddress: string
}>

export interface UseWalletProfileReturn {
  profile: LoadingData<WalletProfile>
  backupProfileImage: string
}

export const useWalletProfile = ({
  walletAddress,
  chainId,
}: UseWalletProfileOptions): UseWalletProfileReturn => {
  // Get PFPK profile from API.
  const profile = loadableToLoadingData(
    useCachedLoadable(
      walletAddress ? pfpkProfileSelector(walletAddress) : undefined
    ),
    EMPTY_PFPK_PROFILE
  )

  // Get Keplr wallet image from API.
  const keplrProfileImageLoadable = useCachedLoadable(
    walletAddress
      ? keplrProfileImageSelector({
          address: walletAddress,
          chainId,
        })
      : undefined
  )
  const keplrProfileImage =
    keplrProfileImageLoadable.state === 'hasValue'
      ? keplrProfileImageLoadable.contents
      : undefined

  // Use Keplr profile image API (followed by a fallback image) as backup if
  // PFPK not set.
  const backupProfileImage =
    keplrProfileImage || getFallbackImage(toBech32Hash(walletAddress))
  // If no NFT from PFPK, fallback.
  if (!profile.loading && !profile.data.nft) {
    profile.data.imageUrl = backupProfileImage
  }

  return { profile, backupProfileImage }
}
