import { makeSignDoc } from '@cosmjs/amino'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { getNativeTokenForChainId } from '@dao-dao/utils'

import { useWallet } from './useWallet'

export const useCfWorkerAuthPostRequest = (
  apiBase: string,
  defaultSignatureType: string
) => {
  const { t } = useTranslation()
  const {
    signAmino,
    chain,
    hexPublicKey,
    address: walletAddress,
  } = useWallet({
    loadAccount: true,
  })

  const ready = !hexPublicKey.loading && !!walletAddress

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
      const nonceResponse: { nonce: number } = await (
        await fetch(`${apiBase}/nonce/${hexPublicKey.data}`)
      ).json()
      if (
        !('nonce' in nonceResponse) ||
        typeof nonceResponse.nonce !== 'number'
      ) {
        console.error(
          'Failed to fetch nonce.',
          nonceResponse,
          hexPublicKey.data
        )
        throw new Error(t('error.loadingData'))
      }

      const dataWithAuth = {
        ...data,
        auth: {
          type: signatureType,
          nonce: nonceResponse.nonce,
          chainId: chain.chain_id,
          chainFeeDenom: getNativeTokenForChainId(chain.chain_id)
            .denomOrAddress,
          chainBech32Prefix: chain.bech32_prefix,
          publicKey: hexPublicKey.data,
        },
      }

      // Sign data.
      const signDocAmino = makeSignDoc(
        [
          {
            type: signatureType,
            value: {
              signer: walletAddress,
              data: JSON.stringify(dataWithAuth, undefined, 2),
            },
          },
        ],
        {
          gas: '0',
          amount: [
            {
              denom: dataWithAuth.auth.chainFeeDenom,
              amount: '0',
            },
          ],
        },
        chain.chain_id,
        '',
        0,
        0
      )
      const {
        signature: { signature },
      } = await signAmino(walletAddress, signDocAmino)

      const body = {
        data: dataWithAuth,
        signature,
      }

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

      // If response OK, return response body.
      return await response.json()
    },
    [
      defaultSignatureType,
      ready,
      apiBase,
      hexPublicKey,
      chain.chain_id,
      chain.bech32_prefix,
      walletAddress,
      signAmino,
      t,
    ]
  )

  return { ready, postRequest }
}
