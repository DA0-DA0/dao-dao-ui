import { toHex } from '@cosmjs/encoding'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { getChainForChainId, signOffChainAuth } from '@dao-dao/utils'

import { useWallet } from './useWallet'

// Cloudflare KV is slow to update, so keep track of the last successful nonce
// that worked so we don't have to wait for the nonce query to update. Make this
// a global variable so it persists across all hook uses.
const lastSuccessfulNonceForApiAndPublicKey: Record<
  string,
  number | undefined
> = {}

/**
 * Hook that makes it easy to interact with our various Cloudflare Workers that
 * use off-chain wallet auth.
 */
export const useCfWorkerAuthPostRequest = (
  apiBase: string,
  defaultSignatureType: string,
  /**
   * Optionally override the current chain context.
   */
  chainId?: string
) => {
  const { t } = useTranslation()
  const { chain, hexPublicKey, chainWallet } = useWallet({
    chainId,
    loadAccount: true,
  })

  // Either the hex public key loaded, or we have a chain wallet that we can
  // attempt connection to.
  const ready = !hexPublicKey.loading || !!chainWallet

  const getHexPublicKey = useCallback(
    async (overrideChainId?: string) => {
      if (
        !hexPublicKey.loading &&
        // If override is the same as the wallet-connected chain.
        overrideChainId === chain.chainId
      ) {
        return hexPublicKey.data
      }

      const thisChainWallet = overrideChainId
        ? chainWallet?.mainWallet.getChainWallet(
            getChainForChainId(overrideChainId).chainName
          )
        : chainWallet

      // If hex public key not loaded, load it from the wallet.
      if (!thisChainWallet) {
        throw new Error(t('error.logInToContinue'))
      }

      // Attempt to connect if needed.
      if (!thisChainWallet.isWalletConnected) {
        await thisChainWallet.connect(false)
      }

      // If still disconnected, throw.
      if (!thisChainWallet.isWalletConnected) {
        throw new Error(t('error.logInToContinue'))
      }

      // Get public key from wallet client, if possible.
      const publicKey = (
        await thisChainWallet.client.getAccount?.(thisChainWallet.chainId)
      )?.pubkey
      if (!publicKey) {
        throw new Error(
          t('error.unsupportedWallet', {
            name: thisChainWallet.walletPrettyName,
          })
        )
      }

      return toHex(publicKey)
    },
    [chain.chainId, chainWallet, hexPublicKey, t]
  )

  const getNonce = useCallback(
    async (overrideChainId?: string) => {
      const hexPublicKey = await getHexPublicKey(overrideChainId)

      // Fetch nonce.
      const nonceResponse: { nonce: number } = await (
        await fetch(`${apiBase}/nonce/${hexPublicKey}`, {
          cache: 'no-store',
        })
      ).json()
      if (
        !('nonce' in nonceResponse) ||
        typeof nonceResponse.nonce !== 'number'
      ) {
        console.error('Failed to fetch nonce.', nonceResponse, hexPublicKey)
        throw new Error(t('error.loadingData'))
      }

      // If nonce was already used, manually increment.
      let nonce = nonceResponse.nonce
      const lastSuccessfulNonce =
        lastSuccessfulNonceForApiAndPublicKey[apiBase + ':' + hexPublicKey] ??
        -1
      if (nonce <= lastSuccessfulNonce) {
        nonce = lastSuccessfulNonce + 1
      }

      return nonce
    },
    [apiBase, getHexPublicKey, t]
  )

  const postRequest = useCallback(
    async <R = any>(
      endpoint: string,
      data?: Record<string, unknown>,
      signatureType = defaultSignatureType,
      /**
       * Override the current chain.
       */
      overrideChainId?: string,
      /**
       * Optionally override the request method. Defaults to POST.
       */
      method = 'POST'
    ): Promise<R> => {
      const hexPublicKey = await getHexPublicKey(overrideChainId)

      const thisChainWallet =
        overrideChainId && overrideChainId !== chain.chainId
          ? chainWallet?.mainWallet.getChainWallet(
              getChainForChainId(overrideChainId).chainName
            )
          : chainWallet

      if (!thisChainWallet?.address) {
        throw new Error(t('error.logInToContinue'))
      }

      const offlineSignerAmino =
        (await thisChainWallet.client.getOfflineSignerAmino?.bind(
          thisChainWallet.client
        )?.(thisChainWallet.chainId)) ||
        // Fallback to normal signer function in case amino signer getter is
        // undefined. This may still return an amino signer, so let's check.
        (await thisChainWallet.client.getOfflineSigner?.bind(
          thisChainWallet.client
        )?.(thisChainWallet.chainId))
      if (!offlineSignerAmino || !('signAmino' in offlineSignerAmino)) {
        throw new Error(
          t('error.unsupportedAminoWallet', {
            name: thisChainWallet.walletPrettyName,
          })
        )
      }

      // Fetch nonce.
      const nonce = await getNonce(overrideChainId)

      const body = await signOffChainAuth({
        type: signatureType,
        nonce,
        chainId: thisChainWallet.chainId,
        address: thisChainWallet.address,
        hexPublicKey,
        data,
        offlineSignerAmino,
      })

      // Send request.
      const response = await fetch(apiBase + endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      // If response not OK, throw error.
      if (!response.ok) {
        const responseBody = await response.json().catch((err) => ({
          error: err instanceof Error ? err.message : JSON.stringify(err),
        }))
        throw new Error(
          responseBody && 'error' in responseBody && responseBody.error
            ? responseBody.error
            : `${t('error.unexpectedError')} ${responseBody}`
        )
      }

      // If succeeded, store nonce.
      lastSuccessfulNonceForApiAndPublicKey[apiBase + ':' + hexPublicKey] =
        nonce

      // If response OK, return response body (unless 204 no content, in which
      // case return undefined).
      return response.status === 204 ? undefined : await response.json()
    },
    [
      defaultSignatureType,
      getHexPublicKey,
      chain.chainId,
      chainWallet,
      getNonce,
      apiBase,
      t,
    ]
  )

  return {
    ready,
    postRequest,
    getNonce,
  }
}
