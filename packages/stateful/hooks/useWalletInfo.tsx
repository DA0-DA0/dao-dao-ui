import { Chain } from '@chain-registry/types'
import { makeSignDoc } from '@cosmjs/amino'
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
import { ChainId, WalletProfileData, WalletProfileUpdate } from '@dao-dao/types'
import {
  PFPK_API_BASE,
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

import { walletProfileDataSelector } from '../recoil'
import { useWallet } from './useWallet'

export type UseWalletInfoOptions = {
  chainId?: string
}

export type UseWalletInfoReturn = {
  walletAddress: string | undefined
  walletHexPublicKey: string | undefined
  walletBalance: number | undefined
  walletStakedBalance: number | undefined
  walletChain: Chain | undefined
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

export const useWalletInfo = ({
  chainId,
}: UseWalletInfoOptions = {}): UseWalletInfoReturn => {
  const {
    chain: walletChain,
    address,
    isWalletConnected,
    hexPublicKey,
  } = useWallet({
    chainId,
    loadAccount: true,
  })
  chainId ||= walletChain.chain_id

  // TODO(cosmos-kit-dynamic-conn-fn): Replace this when cosmos-kit supports
  // dynamic chain connection fn.
  const junoWallet = useWallet({
    chainId: ChainId.JunoMainnet,
  })

  const nativeToken = getNativeTokenForChainId(chainId)

  // Fetch wallet balance.
  const {
    state: walletNativeBalanceState,
    contents: walletNativeBalanceContents,
  } = useCachedLoadable(
    address
      ? nativeBalanceSelector({
          address,
          chainId,
        })
      : undefined
  )
  const walletBalance =
    walletNativeBalanceState === 'hasValue' &&
    walletNativeBalanceContents &&
    nativeToken
      ? convertMicroDenomToDenomWithDecimals(
          walletNativeBalanceContents.amount,
          nativeToken.decimals
        )
      : undefined

  // Fetch staked wallet balance.
  const {
    state: walletStakedNativeBalanceState,
    contents: walletStakedNativeBalanceContents,
  } = useCachedLoadable(
    address
      ? nativeDelegatedBalanceSelector({
          address,
          chainId,
        })
      : undefined
  )
  const walletStakedBalance =
    walletStakedNativeBalanceState === 'hasValue' &&
    walletStakedNativeBalanceContents &&
    nativeToken
      ? convertMicroDenomToDenomWithDecimals(
          walletStakedNativeBalanceContents.amount,
          nativeToken.decimals
        )
      : undefined

  // Get balance fetch time.
  const {
    state: nativeBalancesFetchedAtState,
    contents: nativeBalancesFetchedAtContents,
  } = useCachedLoadable(
    address
      ? nativeBalancesFetchedAtSelector({
          address,
          chainId,
        })
      : undefined
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
      // Use a consistent chain for the signer since the chain ID is part of the
      // signature and PFPK needs to know what to expect.
      const { address: signer, signAmino } = junoWallet
      if (
        !signer ||
        !isWalletConnected ||
        hexPublicKey.loading ||
        profileLoading ||
        // Disallow editing if we don't have correct nonce from server.
        walletProfile.nonce < 0
      ) {
        return
      }

      // Set onUpdate handler.
      onUpdateRef.current = onUpdate
      setUpdatingNonce(walletProfile.nonce)

      try {
        const profileUpdate: WalletProfileUpdate = {
          ...profile,
          nonce: walletProfile.nonce,
        }

        const signDocAmino = makeSignDoc(
          [
            {
              type: 'PFPK Verification',
              value: {
                signer,
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
          ChainId.JunoMainnet,
          '',
          0,
          0
        )
        const {
          signature: { signature },
        } = await signAmino(signer, signDocAmino)

        const response = await fetch(PFPK_API_BASE + `/${hexPublicKey.data}`, {
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
      junoWallet,
      isWalletConnected,
      hexPublicKey,
      profileLoading,
      walletProfile.nonce,
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
    walletHexPublicKey: hexPublicKey.loading ? undefined : hexPublicKey.data,
    walletBalance,
    walletStakedBalance,
    walletChain,
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
