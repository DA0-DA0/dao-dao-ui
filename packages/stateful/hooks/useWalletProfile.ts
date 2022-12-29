import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  keplrProfileImageSelector,
  pfpkProfileSelector,
  walletHexPublicKeySelector,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { LoadingData, WalletProfile, WithChainId } from '@dao-dao/types'
import { getFallbackImage, loadableToLoadingData } from '@dao-dao/utils'

export type UseWalletProfileOptions = WithChainId<{
  walletAddress: string
  hexPublicKey?: string
}>

export interface UseWalletProfileReturn {
  profile: LoadingData<WalletProfile>
  backupProfileImage: string
}

export const useWalletProfile = (
  options: UseWalletProfileOptions
): UseWalletProfileReturn => {
  const publicKeyLoadable = useRecoilValueLoadable(
    options.hexPublicKey
      ? constSelector(options.hexPublicKey)
      : walletHexPublicKeySelector({
          walletAddress: options.walletAddress,
          chainId: options.chainId,
        })
  )
  const publicKey =
    publicKeyLoadable.state === 'hasValue'
      ? publicKeyLoadable.contents
      : undefined

  // Get PFPK profile from API.
  const profile = loadableToLoadingData(
    useCachedLoadable(publicKey ? pfpkProfileSelector(publicKey) : undefined),
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
  const backupProfileImage =
    keplrProfileImage ||
    getFallbackImage(
      // Use walletAddress if publicKey is not available.
      publicKey ?? ('walletAddress' in options ? options.walletAddress : '')
    )
  // If no NFT from PFPK, fallback.
  if (!profile.loading && !profile.data.nft) {
    profile.data.imageUrl = backupProfileImage
  }

  return { profile, backupProfileImage }
}
