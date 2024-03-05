import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { signOffChainAuth } from '@dao-dao/utils'

import { useWallet } from './useWallet'

// Cloudflare KV is slow to update, so keep track of the last successful nonce
// that worked so we don't have to wait for the nonce query to update. Make this
// a global variable so it persists across all hook uses.
const lastSuccessfulNonceForApi: Record<string, number | undefined> = {}

/**
 * Hook that makes it easy to interact with our various Cloudflare Workers that
 * use off-chain wallet auth.
 */
export const useCfWorkerAuthPostRequest = (
  apiBase: string,
  defaultSignatureType: string
) => {
  const { t } = useTranslation()
  const { getOfflineSignerAmino, chain, hexPublicKey } = useWallet({
    loadAccount: true,
  })

  const ready = !hexPublicKey.loading

  const getNonce = useCallback(async () => {
    if (!ready) {
      throw new Error(t('error.logInToContinue'))
    }

    // Fetch nonce.
    const nonceResponse: { nonce: number } = await (
      await fetch(`${apiBase}/nonce/${hexPublicKey.data}`, {
        cache: 'no-store',
      })
    ).json()
    if (
      !('nonce' in nonceResponse) ||
      typeof nonceResponse.nonce !== 'number'
    ) {
      console.error('Failed to fetch nonce.', nonceResponse, hexPublicKey.data)
      throw new Error(t('error.loadingData'))
    }

    // If nonce was already used, manually increment.
    let nonce = nonceResponse.nonce
    const lastSuccessfulNonce = lastSuccessfulNonceForApi[apiBase] ?? -1
    if (nonce <= lastSuccessfulNonce) {
      nonce = lastSuccessfulNonce + 1
    }

    return nonce
  }, [apiBase, hexPublicKey, ready, t])

  const postRequest = useCallback(
    async <R = any>(
      endpoint: string,
      data?: Record<string, unknown>,
      signatureType = defaultSignatureType
    ): Promise<R> => {
      if (!ready) {
        throw new Error(t('error.logInToContinue'))
      }

      // Fetch nonce.
      const nonce = await getNonce()

      const body = await signOffChainAuth({
        type: signatureType,
        nonce,
        chainId: chain.chain_id,
        hexPublicKey: hexPublicKey.data,
        data,
        offlineSignerAmino: await getOfflineSignerAmino(),
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
      lastSuccessfulNonceForApi[apiBase] = nonce

      // If response OK, return response body.
      return await response.json()
    },
    [
      defaultSignatureType,
      ready,
      getNonce,
      chain.chain_id,
      hexPublicKey,
      getOfflineSignerAmino,
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
