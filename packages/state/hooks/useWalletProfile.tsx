import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  constSelector,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import {
  LoadingData,
  WalletProfile,
  WalletProfileUpdate,
} from '@dao-dao/tstypes'
import {
  CHAIN_ID,
  NATIVE_DECIMALS,
  PFPK_API_BASE,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
  loadableToLoadingData,
} from '@dao-dao/utils'

import {
  nativeBalanceSelector,
  nativeDelegatedBalanceSelector,
  refreshWalletBalancesIdAtom,
  refreshWalletProfileAtom,
} from '../recoil'
import {
  keplrProfileImageSelector,
  walletProfileSelector,
} from '../recoil/selectors/wallet'
import { useCachedLoadable } from './useCachedLoadable'

export interface UseWalletProfileReturn {
  walletAddress: string | undefined
  walletBalance: number | undefined
  walletStakedBalance: number | undefined
  refreshBalances: () => void

  walletProfile: LoadingData<WalletProfile>
  updateProfile: (profile: Omit<WalletProfileUpdate, 'nonce'>) => Promise<void>
  updateProfileName: (
    name: Required<WalletProfileUpdate>['name']
  ) => Promise<void>
  updateProfileNft: (nft: Required<WalletProfileUpdate>['nft']) => Promise<void>
  updatingProfile: boolean
  backupProfileImage: string | undefined
}

export const useWalletProfile = (): UseWalletProfileReturn => {
  const { signingCosmWasmClient, address, publicKey, walletClient } =
    useWallet()

  // Fetch wallet balance.
  const {
    state: walletNativeBalanceState,
    contents: walletNativeBalanceContents,
  } = useRecoilValueLoadable(
    address ? nativeBalanceSelector(address) : constSelector(undefined)
  )
  const walletBalance =
    walletNativeBalanceState === 'hasValue' && walletNativeBalanceContents
      ? convertMicroDenomToDenomWithDecimals(
          walletNativeBalanceContents.amount,
          NATIVE_DECIMALS
        )
      : undefined

  // Fetch staked wallet balance.
  const {
    state: walletStakedNativeBalanceState,
    contents: walletStakedNativeBalanceContents,
  } = useRecoilValueLoadable(
    address ? nativeDelegatedBalanceSelector(address) : constSelector(undefined)
  )
  const walletStakedBalance =
    walletStakedNativeBalanceState === 'hasValue' &&
    walletStakedNativeBalanceContents
      ? convertMicroDenomToDenomWithDecimals(
          walletStakedNativeBalanceContents.amount,
          NATIVE_DECIMALS
        )
      : undefined

  const setRefreshWalletBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(address ?? '')
  )
  const refreshBalances = useCallback(
    () => setRefreshWalletBalancesId((id) => id + 1),
    [setRefreshWalletBalancesId]
  )

  const setRefreshWalletProfile = useSetRecoilState(
    refreshWalletProfileAtom(publicKey?.hex ?? '')
  )
  const refreshWalletProfile = useCallback(
    () => setRefreshWalletProfile((id) => id + 1),
    [setRefreshWalletProfile]
  )

  // Get wallet profile from API.
  const walletProfile = loadableToLoadingData(
    useCachedLoadable(
      publicKey ? walletProfileSelector(publicKey.hex) : undefined
    ),
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
    publicKey ? keplrProfileImageSelector(publicKey.hex) : undefined
  )
  const keplrProfileImage =
    keplrProfileImageLoadable.state === 'hasValue'
      ? keplrProfileImageLoadable.contents
      : undefined
  // Use Keplr profile image API (followed by a fallback image) as backup if
  // PFPK not set.
  const backupProfileImage =
    keplrProfileImage ?? getFallbackImage(publicKey?.hex)
  if (!walletProfile.loading && !walletProfile.data.imageUrl) {
    walletProfile.data.imageUrl = backupProfileImage
  }

  const [updatingNonce, setUpdatingNonce] = useState<number>()
  const onUpdateRef = useRef<() => void>()
  const _updateProfile = useCallback(
    async (
      profile: Omit<WalletProfileUpdate, 'nonce'>,
      onUpdate?: () => void
    ): Promise<void> => {
      if (
        !publicKey ||
        !address ||
        !signingCosmWasmClient ||
        !walletClient ||
        walletProfile.loading ||
        // Disallow editing if we don't have correct nonce from server.
        walletProfile.data.nonce < 0
      ) {
        return
      }

      // Set onUpdate handler.
      onUpdateRef.current = onUpdate
      setUpdatingNonce(walletProfile.data.nonce)
      try {
        const profileUpdate: WalletProfileUpdate = {
          ...profile,
          nonce: walletProfile.data.nonce,
        }

        // https://github.com/chainapsis/keplr-wallet/blob/54aaaf6112d41944eaf23826db823eb044b09e78/packages/provider/src/core.ts#L168-L181
        const { signature } = await walletClient.signArbitrary(
          CHAIN_ID,
          address,
          JSON.stringify(profileUpdate)
        )

        const response = await fetch(PFPK_API_BASE + `/${publicKey.hex}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profile: profileUpdate,
            signature,
            signer: address,
          }),
        })

        refreshWalletProfile()

        if (!response.ok) {
          const res = await response.json()
          throw new Error(
            `${res.error}${res.message ? `: ${res.message}` : ''}`
          )
        }
      } catch (err) {
        // If errored, clear updating state since we did not update.
        onUpdateRef.current = undefined
        setUpdatingNonce(undefined)

        // Rethrow error.
        throw err
      }
    },
    [
      address,
      publicKey,
      refreshWalletProfile,
      signingCosmWasmClient,
      walletClient,
      walletProfile,
    ]
  )
  // Listen for nonce to incremenent to clear updating state, since we want the
  // new profile to be ready on the same render that we stop loading.
  useEffect(() => {
    if (updatingNonce === undefined || walletProfile.loading) {
      return
    }

    // If nonce incremented, clear updating state and call onUpdate handler if
    // exists.
    if (walletProfile.data.nonce > updatingNonce) {
      onUpdateRef.current?.()
      onUpdateRef.current = undefined

      setUpdatingNonce(undefined)
    }
  }, [updatingNonce, walletProfile])

  // Promisified updateProfile.
  const updateProfile = useCallback(
    (profile: Omit<WalletProfileUpdate, 'nonce'>) =>
      new Promise<void>((resolve, reject) =>
        _updateProfile(profile, resolve).catch(reject)
      ),
    [_updateProfile]
  )

  const updateProfileName = useCallback(
    (name: Required<WalletProfileUpdate>['name']) => updateProfile({ name }),
    [updateProfile]
  )
  const updateProfileNft = useCallback(
    (nft: Required<WalletProfileUpdate>['nft']) => updateProfile({ nft }),
    [updateProfile]
  )

  return {
    walletAddress: address,
    walletBalance,
    walletStakedBalance,
    refreshBalances,

    walletProfile,
    updateProfile,
    updateProfileName,
    updateProfileNft,
    updatingProfile: updatingNonce !== undefined,
    backupProfileImage,
  }
}
