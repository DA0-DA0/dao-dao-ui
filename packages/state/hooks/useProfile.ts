import { constSelector, useRecoilValueLoadable } from 'recoil'

import { LoadingData, WalletProfile, WithChainId } from '@dao-dao/types'
import { useCachedLoadable } from '@dao-dao/stateless'
import { getFallbackImage, loadableToLoadingData } from '@dao-dao/utils'

import {
  keplrProfileImageSelector,
  walletHexPublicKeySelector,
  walletProfileSelector,
} from '../recoil/selectors/wallet'

export type UseProfileOptions = WithChainId<
  | {
      walletAddress: string
    }
  | {
      hexPublicKey?: string
    }
>

export interface UseProfileReturn {
  profile: LoadingData<WalletProfile>
  backupProfileImage: string
}

export const useProfile = (options: UseProfileOptions): UseProfileReturn => {
  const publicKeyLoadable = useRecoilValueLoadable(
    'walletAddress' in options
      ? walletHexPublicKeySelector({
          walletAddress: options.walletAddress,
          chainId: options.chainId,
        })
      : constSelector(options.hexPublicKey)
  )
  const publicKey =
    publicKeyLoadable.state === 'hasValue'
      ? publicKeyLoadable.contents
      : undefined

  // Get wallet profile from API.
  const profile = loadableToLoadingData(
    useCachedLoadable(publicKey ? walletProfileSelector(publicKey) : undefined),
    {
      // Disallows editing if we don't have correct nonce from server.
      nonce: -1,
      name: null,
      imageUrl: '',
      nft: null,
    }
  )
  // Get Keplr wallet image from API.
  const keplrProfileImageLoadable = useCachedLoadable(
    publicKey ? keplrProfileImageSelector(publicKey) : undefined
  )
  const keplrProfileImage =
    keplrProfileImageLoadable.state === 'hasValue'
      ? keplrProfileImageLoadable.contents
      : undefined
  // Use Keplr profile image API (followed by a fallback image) as backup if
  // PFPK not set.
  const backupProfileImage = keplrProfileImage || getFallbackImage(publicKey)
  // If no NFT from PFPK, fallback.
  if (!profile.loading && !profile.data.nft) {
    profile.data.imageUrl = backupProfileImage
  }

  return { profile, backupProfileImage }
}
