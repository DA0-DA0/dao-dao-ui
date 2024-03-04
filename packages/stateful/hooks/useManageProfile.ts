import { toHex } from '@cosmjs/encoding'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCachedLoading } from '@dao-dao/stateless'
import {
  AddChainsFunction,
  AddChainsStatus,
  LoadingData,
  PfpkProfileUpdate,
  PfpkProfileUpdateFunction,
  UnifiedProfile,
} from '@dao-dao/types'
import {
  PFPK_API_BASE,
  SignedBody,
  getDisplayNameForChainId,
  makeManuallyResolvedPromise,
  signOffChainAuth,
} from '@dao-dao/utils'

import { makeEmptyUnifiedProfile, profileSelector } from '../recoil'
import { useCfWorkerAuthPostRequest } from './useCfWorkerAuthPostRequest'
import { useRefreshProfile } from './useRefreshProfile'
import { useWallet } from './useWallet'

export type UseManageProfileOptions = {}

export type UseManageProfileReturn = {
  /**
   * Whether or not the current wallet is connected. When an address is passed,
   * this will be false.
   */
  connected: boolean
  /**
   * The profile for the currently connected wallet. If not connected and no
   * address was passed, this will be in the loading state. The unified profile
   * loads data from backup sources in case profile information is missing and
   * substitutes a default profile on error.
   */
  profile: LoadingData<UnifiedProfile>
  /**
   * Refresh the profile for the currently connected wallet.
   */
  refreshProfile: () => void
  /**
   * Update profile information.
   */
  updateProfile: {
    /**
     * Whether or not the profile is loaded and ready to be updated.
     */
    ready: boolean
    /**
     * Whether or not the profile is being updated.
     */
    updating: boolean
    /**
     * Update profile information.
     */
    go: PfpkProfileUpdateFunction
  }
  /**
   * Add chains to the profile.
   */
  addChains: {
    /**
     * Whether or not the add chains process is ready.
     */
    ready: boolean
    /**
     * Add chain process status.
     */
    status: AddChainsStatus
    /**
     * Add chains to the profile.
     */
    go: AddChainsFunction
  }
}

/**
 * A hook to help manage the profile for the currently connected wallet.
 */
export const useManageProfile =
  ({}: UseManageProfileOptions = {}): UseManageProfileReturn => {
    const { t } = useTranslation()
    const {
      address = '',
      isWalletConnected,
      chain: { chain_id: walletChainId },
    } = useWallet()

    const profile = useCachedLoading(
      profileSelector({
        chainId: walletChainId,
        address,
      }),
      makeEmptyUnifiedProfile(address)
    )

    const refreshProfile = useRefreshProfile(address, profile)

    const wallet = useWallet({
      loadAccount: true,
    })

    const pfpkApi = useCfWorkerAuthPostRequest(PFPK_API_BASE, '')

    const ready =
      !profile.loading &&
      !profile.updating &&
      // Ensure we have a profile loaded from the server. The nonce is -1 if it
      // failed to load.
      profile.data.nonce >= 0 &&
      !!wallet.chainWallet &&
      !wallet.hexPublicKey.loading &&
      pfpkApi.ready

    const [updating, setUpdating] = useState(false)
    const [updatingNonce, setUpdatingNonce] = useState<number>()
    const onUpdateRef = useRef<() => void>()

    const profileNonce = profile.loading ? -1 : profile.data.nonce
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateProfile = useCallback(
      // Delay resolving the profile update promise until the new profile is
      // loaded in state after a successful refresh.
      makeManuallyResolvedPromise(
        async (profileUpdates: Omit<PfpkProfileUpdate, 'nonce'>) => {
          if (!ready || profileNonce < 0) {
            return false
          }

          setUpdating(true)
          try {
            const profileUpdate: PfpkProfileUpdate = {
              ...profileUpdates,
              nonce: profileNonce,
            }

            await pfpkApi.postRequest(
              '/',
              {
                profile: profileUpdate,
              },
              'DAO DAO Profile | Update'
            )

            refreshProfile()

            // On success, the updating state is cleared when the promise
            // resolves.
          } catch (err) {
            setUpdating(false)

            // Rethrow error.
            throw err
          }
        },
        (resolve) => {
          // Set onUpdate handler.
          onUpdateRef.current = () => {
            resolve()
            setUpdating(false)
          }
          setUpdatingNonce(profileNonce)
        }
      ),
      [pfpkApi, profileNonce, ready, refreshProfile]
    )

    // Listen for nonce to incremenent to clear updating state, since we want
    // the new profile to be ready on the same render that we stop loading.
    useEffect(() => {
      if (updatingNonce === undefined || profile.loading) {
        return
      }

      // If nonce incremented, clear updating state and call onUpdate handler if
      // exists.
      if (profile.data.nonce > updatingNonce) {
        onUpdateRef.current?.()
        onUpdateRef.current = undefined

        setUpdatingNonce(undefined)
      }
    }, [updatingNonce, profile])

    const [addChainsStatus, setAddChainsStatus] =
      useState<AddChainsStatus>('idle')
    const addChains: AddChainsFunction = async (
      chainIds,
      { setChainStatus } = {}
    ) => {
      if (!wallet.chainWallet) {
        throw new Error(t('error.logInToContinue'))
      }

      // Type-check.
      if (!ready || wallet.hexPublicKey.loading) {
        throw new Error(t('error.loadingData'))
      }

      if (chainIds.length > 0) {
        setAddChainsStatus('chains')

        let error: unknown
        try {
          // Get chain wallets.
          const allChainWallets =
            wallet.chainWallet.mainWallet.getChainWalletList(false)
          const chainWallets = chainIds.map(
            (chainId) => allChainWallets.find((cw) => cw.chainId === chainId)!
          )

          // Stop if missing chain wallets.
          const missingChainWallets = chainIds.filter(
            (_, index) => !chainWallets[index]
          )
          if (missingChainWallets.length > 0) {
            throw new Error(
              t('error.unexpectedlyMissingChains', {
                chains: missingChainWallets
                  .map((chainId) => getDisplayNameForChainId(chainId))
                  .join(', '),
              })
            )
          }

          // Load nonce from API.
          const nonce = await pfpkApi.getNonce()

          const allowances: SignedBody<{
            allow: string
            chainIds: string[]
          }>[] = []

          // For each chain, sign allowance.
          for (const chainWallet of chainWallets) {
            setChainStatus?.(chainWallet.chainId, 'loading')

            // Make sure the chain is connected.
            if (!chainWallet.isWalletConnected) {
              await chainWallet.connect(false)
            }

            // If still not connected, error.
            if (!chainWallet.isWalletConnected) {
              throw new Error(t('error.failedToConnect'))
            }

            // Get the account public key.
            const pubkeyData = (
              await chainWallet.client.getAccount?.(chainWallet.chainId)
            )?.pubkey
            if (!pubkeyData) {
              throw new Error(t('error.failedToGetAccountFromWallet'))
            }

            const offlineSignerAmino =
              await chainWallet.client.getOfflineSignerAmino?.(
                chainWallet.chainId
              )
            // If no amino signer, error that wallet is unsupported. This should
            // only happen if there's no amino signer getter defined.
            if (!offlineSignerAmino) {
              throw new Error(t('error.unsupportedWallet'))
            }

            const hexPublicKey = toHex(pubkeyData)

            // Sign allowance for main wallet to register this public key for
            // this chain.
            const body = await signOffChainAuth({
              type: 'DAO DAO Profile | Add Chain Allowance',
              nonce,
              chainId: chainWallet.chainId,
              hexPublicKey,
              data: {
                allow: wallet.hexPublicKey.data,
                chainIds: [chainWallet.chainId],
              },
              offlineSignerAmino,
              // No signature required if we're registering a new chain for the
              // same public key already attached to the profile, which is the
              // public key signing the entire registration request.
              generateOnly: hexPublicKey === wallet.hexPublicKey.data,
            })

            allowances.push(body)

            setChainStatus?.(chainWallet.chainId, 'done')
          }

          setAddChainsStatus('registering')

          // Submit allowances. Throws error on failure.
          await pfpkApi.postRequest(
            '/register',
            {
              publicKeys: allowances,
            },
            'DAO DAO Profile | Add Chains'
          )
        } catch (err) {
          // Reset all chain statuses on error.
          if (setChainStatus) {
            chainIds.forEach((chainId) => setChainStatus?.(chainId, 'idle'))
          }

          // Set error to be thrown after finally block.
          error = err
        } finally {
          // Refresh profile.
          refreshProfile()

          // Reset status.
          setAddChainsStatus('idle')
        }

        // Throw error on failure. This allows the finally block above to run by
        // throwing the error after the entire try clause.
        if (error) {
          throw error
        }
      }
    }

    return {
      // Connected is only relevant when using the currently connected wallet.
      // If an address is passed, set connected to false.
      connected: address ? false : isWalletConnected,
      profile,
      refreshProfile,
      updateProfile: {
        ready,
        updating,
        go: updateProfile,
      },
      addChains: {
        ready,
        status: addChainsStatus,
        go: addChains,
      },
    }
  }
