import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { PfpkClient, profileQueries } from '@dao-dao/state'
import { getChainForChainId } from '@dao-dao/utils'

import { useWallet } from './useWallet'

export type UsePfpkClientOptions = {
  /**
   * Optionally provide an API URL to use as a prefix for all requests.
   */
  apiUrl?: string
  /**
   * The default signature type to use. This can be overriden per-request.
   *
   * Defaults to 'DAO DAO Auth'.
   */
  defaultSignatureType?: string
  /**
   * Optionally override the current chain context.
   */
  chainId?: string
}

/**
 * Hook that sets up a `PfpkClient` instance with the currently connected wallet
 * that makes it easy to interact with various off-chain services that use the
 * core PFPK auth system.
 */
export const usePfpkClient = ({
  apiUrl,
  defaultSignatureType = 'DAO DAO Auth',
  chainId,
}: UsePfpkClientOptions) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const {
    chain: currentChain,
    chainWallet: currentChainWallet,
    isWalletConnected,
  } = useWallet({
    chainId,
    loadAccount: true,
  })

  const pfpkClient = useMemo(
    () =>
      new PfpkClient({
        urlPrefix: apiUrl,
        defaultChainId: currentChain.chainId,
        defaultSignatureType,
        getOfflineSignerAmino: async (chainId) => {
          const chainWallet =
            chainId === currentChain.chainId
              ? currentChainWallet
              : currentChainWallet?.mainWallet.getChainWallet(
                  getChainForChainId(chainId).chainName
                )

          // If hex public key not loaded, load it from the wallet.
          if (!chainWallet) {
            throw new Error(t('error.logInToContinue'))
          }

          // Attempt to connect if needed.
          if (!chainWallet.isWalletConnected) {
            await chainWallet.connect(false)
          }

          // If still disconnected, throw.
          if (!chainWallet.isWalletConnected) {
            throw new Error(t('error.logInToContinue'))
          }

          const offlineSignerAmino =
            (await chainWallet.client.getOfflineSignerAmino?.bind(
              chainWallet.client
            )?.(chainWallet.chainId)) ||
            // Fallback to normal signer function in case amino signer getter is
            // undefined. This may still return an amino signer, so let's check.
            (await chainWallet.client.getOfflineSigner?.bind(
              chainWallet.client
            )?.(chainWallet.chainId))
          if (!offlineSignerAmino || !('signAmino' in offlineSignerAmino)) {
            throw new Error(
              t('error.unsupportedAminoWallet', {
                name: chainWallet.walletPrettyName,
              })
            )
          }

          return offlineSignerAmino
        },
        // Refresh query state when profile is updated.
        onProfileUpdated: async ({ chain: { chainId }, address }) => {
          await queryClient.refetchQueries(
            profileQueries.pfpk({
              address,
            })
          )
          await queryClient.refetchQueries(
            profileQueries.unified(queryClient, {
              chainId,
              address,
            })
          )
        },
      }),
    // Reset when wallet changes since they may have switched chains/accounts.
    [
      apiUrl,
      currentChain.chainId,
      currentChainWallet,
      defaultSignatureType,
      queryClient,
      t,
    ]
  )

  // Tear down the client when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      console.log('tearing down pfpkClient')
      pfpkClient.teardown()
    }
  }, [pfpkClient])

  return {
    isWalletConnected,
    pfpkClient,
  }
}
