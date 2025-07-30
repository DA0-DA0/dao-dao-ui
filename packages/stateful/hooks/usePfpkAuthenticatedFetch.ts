import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { PfpkClient } from '@dao-dao/state'
import { getChainForChainId } from '@dao-dao/utils'

import { useWallet } from './useWallet'

export type UsePfpkAuthenticatedFetchOptions = {
  /**
   * The API URL.
   */
  apiUrl: string
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
 * Hook that makes it easy to interact with our various off-chain services that
 * use the core PFPK auth system.
 */
export const usePfpkAuthenticatedFetch = ({
  apiUrl,
  defaultSignatureType = 'DAO DAO Auth',
  chainId,
}: UsePfpkAuthenticatedFetchOptions) => {
  const { t } = useTranslation()
  const { chain: currentChain, chainWallet: currentChainWallet } = useWallet({
    chainId,
    loadAccount: true,
  })

  const queryClient = useQueryClient()
  const pfpkClient = useMemo(
    () =>
      new PfpkClient({
        queryClient,
        defaultChainId: currentChain.chainId,
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
      }),
    // Reset when wallet changes since they may have switched chains/accounts.
    [currentChain.chainId, currentChainWallet, queryClient, t]
  )

  // Ready if we have a chain wallet that we can attempt connection to (this is
  // the same as being logged in).
  const ready = !!currentChainWallet

  const postRequest = useCallback(
    async <R = any>(
      /**
       * The endpoint to send the request to.
       */
      endpoint: string,
      /**
       * The data to send.
       */
      data?: Record<string, unknown>,
      /**
       * The signature type to use.
       */
      signatureType = defaultSignatureType,
      /**
       * Override the current chain.
       */
      overrideChainId?: string,
      /**
       * Optionally override the request method. Defaults to POST.
       */
      method = 'POST'
    ): Promise<R> =>
      pfpkClient.sendSignedRequest({
        chainId: overrideChainId,
        url: apiUrl + endpoint,
        method,
        type: signatureType,
        data,
      }),
    [defaultSignatureType, pfpkClient, apiUrl]
  )

  return {
    ready,
    postRequest,
    pfpkClient,
  }
}
