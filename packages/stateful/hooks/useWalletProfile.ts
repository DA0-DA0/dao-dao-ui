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

const EMPTY_PFPK_PROFILE: WalletProfile = {
  // Disallows editing if we don't have correct nonce from server.
  nonce: -1,
  name: null,
  imageUrl: '',
  nft: null,
}

export const useWalletProfile = (
  options: UseWalletProfileOptions
): UseWalletProfileReturn => {
  const publicKeyLoadable = useRecoilValueLoadable(
    options.hexPublicKey
      ? constSelector(options.hexPublicKey)
      : options.walletAddress
      ? walletHexPublicKeySelector({
          walletAddress: options.walletAddress,
          chainId: options.chainId,
        })
      : constSelector(undefined)
  )
  const publicKey =
    publicKeyLoadable.state === 'hasValue'
      ? publicKeyLoadable.contents
      : undefined

  // Get PFPK profile from API.
  let profile = loadableToLoadingData(
    useCachedLoadable(
      publicKey
        ? pfpkProfileSelector(publicKey)
        : // If the public key is not loaded, it may still be loading. Returning undefined here indicates to `useCachedLoadable` that we're still loading.
          undefined
    ),
    EMPTY_PFPK_PROFILE
  )
  // If public key loaded undefined, the account does not exist on the chain and
  // we can't retrieve its public key. Thus return an empty profile.
  if (profile.loading && publicKeyLoadable.state === 'hasValue') {
    profile = {
      loading: false,
      data: EMPTY_PFPK_PROFILE,
    }
  }

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
