import { toHex } from '@cosmjs/encoding'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { signOffChainAuth } from '@dao-dao/utils'

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
  // Optionally override the current chain context.
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

  const getHexPublicKey = useCallback(async () => {
    if (!hexPublicKey.loading) {
      return hexPublicKey.data
    }

    // If hex public key not loaded, load it from the wallet.
    if (!chainWallet) {
      throw new Error(t('error.loadingData'))
    }

    // Attempt to connect if needed.
    if (!chainWallet.isWalletConnected) {
      await chainWallet.connect(false)
    }

    // If still disconnected, throw.
    if (!chainWallet.isWalletConnected) {
      throw new Error(t('error.logInToContinue'))
    }

    // Get public key from wallet client, if possible.
    const publicKey = (await chainWallet.client.getAccount?.(chain.chain_id))
      ?.pubkey
    if (!publicKey) {
      throw new Error(t('error.unsupportedWallet'))
    }

    return toHex(publicKey)
  }, [chain.chain_id, chainWallet, hexPublicKey, t])

  const getNonce = useCallback(async () => {
    const hexPublicKey = await getHexPublicKey()

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
      lastSuccessfulNonceForApiAndPublicKey[apiBase + ':' + hexPublicKey] ?? -1
    if (nonce <= lastSuccessfulNonce) {
      nonce = lastSuccessfulNonce + 1
    }

    return nonce
  }, [apiBase, getHexPublicKey, t])

  const postRequest = useCallback(
    async <R = any>(
      endpoint: string,
      data?: Record<string, unknown>,
      signatureType = defaultSignatureType
    ): Promise<R> => {
      const hexPublicKey = await getHexPublicKey()

      const offlineSignerAmino =
        await chainWallet?.client.getOfflineSignerAmino?.bind(
          chainWallet.client
        )?.(chain.chain_id)
      if (!offlineSignerAmino) {
        throw new Error(t('error.unsupportedWallet'))
      }

      // Fetch nonce.
      const nonce = await getNonce()

      const body = await signOffChainAuth({
        type: signatureType,
        nonce,
        chainId: chain.chain_id,
        hexPublicKey,
        data,
        offlineSignerAmino,
      })

      // Send request.
      const response = await fetch(apiBase + endpoint, {
        method: 'POST',
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

      // If response OK, return response body.
      return await response.json()
    },
    [
      defaultSignatureType,
      getHexPublicKey,
      chainWallet,
      getNonce,
      chain.chain_id,
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
