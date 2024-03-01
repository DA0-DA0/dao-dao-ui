import { toHex } from '@cosmjs/encoding'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshWalletProfileAtom } from '@dao-dao/state'
import { useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  AddChainsFunction,
  AddChainsStatus,
  LoadingDataWithError,
  PfpkProfile,
} from '@dao-dao/types'
import {
  PFPK_API_BASE,
  SignedBody,
  getDisplayNameForChainId,
  signOffChainAuth,
} from '@dao-dao/utils'

import { pfpkProfileSelector } from '../recoil'
import { useCfWorkerAuthPostRequest } from './useCfWorkerAuthPostRequest'
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
   * address was passed, this will be in the loading state.
   */
  profile: LoadingDataWithError<PfpkProfile>
  /**
   * Refresh the profile for the currently connected wallet.
   */
  refreshProfile: () => void
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
    const { address = '', isWalletConnected } = useWallet()

    const profile = useCachedLoadingWithError(pfpkProfileSelector(address))

    const setRefreshWalletProfile = useSetRecoilState(
      refreshWalletProfileAtom(address)
    )
    const refreshProfile = useCallback(
      () => setRefreshWalletProfile((id) => id + 1),
      [setRefreshWalletProfile]
    )

    const wallet = useWallet({
      loadAccount: true,
    })

    const pfpkApi = useCfWorkerAuthPostRequest(
      PFPK_API_BASE,
      'DAO DAO Profile | Add Chains'
    )

    const ready =
      !profile.loading &&
      !profile.errored &&
      profile.data.nonce >= 0 &&
      !!wallet.chainWallet &&
      !wallet.hexPublicKey.loading &&
      pfpkApi.ready

    const [status, setStatus] = useState<AddChainsStatus>('idle')

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
        setStatus('chains')

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

          setStatus('registering')

          // Submit allowances. Throws error on failure.
          await pfpkApi.postRequest('/register', {
            publicKeys: allowances,
          })
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
          setStatus('idle')
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
      addChains: {
        ready,
        status,
        go: addChains,
      },
    }
  }
