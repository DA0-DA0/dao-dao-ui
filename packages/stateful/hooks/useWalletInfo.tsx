import { makeSignDoc } from '@cosmjs/amino'
import {
  ChainInfoID,
  useConnectWalletToChain,
  useWallet,
} from '@noahsaso/cosmodal'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  nativeBalanceSelector,
  nativeBalancesFetchedAtSelector,
  nativeDelegatedBalanceSelector,
  refreshNativeTokenStakingInfoAtom,
  refreshWalletBalancesIdAtom,
  refreshWalletProfileAtom,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { WalletProfileData, WalletProfileUpdate } from '@dao-dao/types'
import {
  NATIVE_DECIMALS,
  PFPK_API_BASE,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { walletProfileDataSelector } from '../recoil'

export interface UseWalletReturn {
  walletAddress: string | undefined
  walletBalance: number | undefined
  walletStakedBalance: number | undefined
  dateBalancesFetched: Date | undefined
  refreshBalances: () => void

  walletProfileData: WalletProfileData
  updateProfile: (profile: Omit<WalletProfileUpdate, 'nonce'>) => Promise<void>
  updateProfileName: (
    name: Required<WalletProfileUpdate>['name']
  ) => Promise<void>
  updateProfileNft: (nft: Required<WalletProfileUpdate>['nft']) => Promise<void>
  updatingProfile: boolean
  backupImageUrl: string
}

export const useWalletInfo = (chainId?: string): UseWalletReturn => {
  const { address, connected, publicKey } = useWallet()
  const connectWalletToChain = useConnectWalletToChain()

  // Fetch wallet balance.
  const {
    state: walletNativeBalanceState,
    contents: walletNativeBalanceContents,
  } = useCachedLoadable(
    address ? nativeBalanceSelector({ address, chainId }) : undefined
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
  } = useCachedLoadable(
    address ? nativeDelegatedBalanceSelector({ address, chainId }) : undefined
  )
  const walletStakedBalance =
    walletStakedNativeBalanceState === 'hasValue' &&
    walletStakedNativeBalanceContents
      ? convertMicroDenomToDenomWithDecimals(
          walletStakedNativeBalanceContents.amount,
          NATIVE_DECIMALS
        )
      : undefined

  // Get balance fetch time.
  const {
    state: nativeBalancesFetchedAtState,
    contents: nativeBalancesFetchedAtContents,
  } = useCachedLoadable(
    address ? nativeBalancesFetchedAtSelector({ address, chainId }) : undefined
  )
  const dateBalancesFetched =
    nativeBalancesFetchedAtState === 'hasValue'
      ? nativeBalancesFetchedAtContents
      : undefined

  const setRefreshWalletBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(address ?? '')
  )
  const setRefreshStakingId = useSetRecoilState(
    refreshNativeTokenStakingInfoAtom(address ?? '')
  )
  const refreshBalances = useCallback(() => {
    setRefreshWalletBalancesId((id) => id + 1)
    setRefreshStakingId((id) => id + 1)
  }, [setRefreshStakingId, setRefreshWalletBalancesId])

  const setRefreshWalletProfile = useSetRecoilState(
    refreshWalletProfileAtom(address ?? '')
  )
  const refreshWalletProfile = useCallback(
    () => setRefreshWalletProfile((id) => id + 1),
    [setRefreshWalletProfile]
  )

  const walletProfileDataValue = useRecoilValue(
    walletProfileDataSelector({
      address: address ?? '',
      chainId,
    })
  )

  const [cachedProfileData, setCachedProfileData] = useState<
    WalletProfileData | undefined
  >()
  // Clear cached profile data when address changes.
  useEffect(() => {
    setCachedProfileData(undefined)
  }, [address])
  // Cache profile data when it's loaded.
  useEffect(() => {
    if (!walletProfileDataValue.loading) {
      setCachedProfileData(walletProfileDataValue)
    }
  }, [walletProfileDataValue])
  const walletProfileData = cachedProfileData || walletProfileDataValue

  const {
    loading: profileLoading,
    profile: walletProfile,
    backupImageUrl,
  } = walletProfileData

  const [updatingNonce, setUpdatingNonce] = useState<number>()
  const onUpdateRef = useRef<() => void>()
  const _updateProfile = useCallback(
    async (
      profile: Omit<WalletProfileUpdate, 'nonce'>,
      onUpdate?: () => void
    ): Promise<void> => {
      if (
        !connected ||
        !publicKey ||
        profileLoading ||
        // Disallow editing if we don't have correct nonce from server.
        walletProfile.nonce < 0
      ) {
        return
      }

      // Use a consistent chain for the signer since the chain ID is part of the
      // signature and PFPK needs to know what to expect.
      const { address: signingAddress, walletClient: signingWalletClient } =
        await connectWalletToChain(ChainInfoID.Juno1)

      // Set onUpdate handler.
      onUpdateRef.current = onUpdate
      setUpdatingNonce(walletProfile.nonce)
      try {
        const profileUpdate: WalletProfileUpdate = {
          ...profile,
          nonce: walletProfile.nonce,
        }

        const offlineSignerAmino =
          await signingWalletClient.getOfflineSignerOnlyAmino(ChainInfoID.Juno1)
        const signDocAmino = makeSignDoc(
          [
            {
              type: 'PFPK Verification',
              value: {
                signer: signingAddress,
                data: JSON.stringify(profileUpdate, undefined, 2),
              },
            },
          ],
          {
            gas: '0',
            amount: [
              {
                denom: 'ujuno',
                amount: '0',
              },
            ],
          },
          ChainInfoID.Juno1,
          '',
          0,
          0
        )
        const {
          signature: { signature },
        } = await offlineSignerAmino.signAmino(signingAddress, signDocAmino)

        const response = await fetch(PFPK_API_BASE + `/${publicKey.hex}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profile: profileUpdate,
            signature,
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
      connected,
      publicKey,
      profileLoading,
      walletProfile.nonce,
      connectWalletToChain,
      refreshWalletProfile,
    ]
  )
  // Listen for nonce to incremenent to clear updating state, since we want the
  // new profile to be ready on the same render that we stop loading.
  useEffect(() => {
    if (updatingNonce === undefined || profileLoading) {
      return
    }

    // If nonce incremented, clear updating state and call onUpdate handler if
    // exists.
    if (walletProfile.nonce > updatingNonce) {
      onUpdateRef.current?.()
      onUpdateRef.current = undefined

      setUpdatingNonce(undefined)
    }
  }, [updatingNonce, walletProfile, profileLoading])

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
    dateBalancesFetched,
    refreshBalances,

    walletProfileData,
    updateProfile,
    updateProfileName,
    updateProfileNft,
    updatingProfile: updatingNonce !== undefined,
    backupImageUrl,
  }
}
