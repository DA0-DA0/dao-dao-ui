import { makeSignDoc } from '@cosmjs/amino'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export const useCfWorkerAuthPostRequest = (
  apiBase: string,
  signatureType: string
) => {
  const { t } = useTranslation()
  const {
    walletClient,
    publicKey,
    chainInfo,
    address: walletAddress,
  } = useWallet()

  const ready = !!walletClient && !!publicKey && !!chainInfo && !!walletAddress

  const postRequest = useCallback(
    async <R = any>(
      endpoint: string,
      data?: Record<string, unknown>
    ): Promise<R> => {
      if (!ready) {
        throw new Error(t('error.connectWalletToContinue'))
      }

      // Fetch nonce.
      const nonceResponse: { nonce: number } = await (
        await fetch(`${apiBase}/nonce/${publicKey.hex}`)
      ).json()
      if (
        !('nonce' in nonceResponse) ||
        typeof nonceResponse.nonce !== 'number'
      ) {
        console.error('Failed to fetch nonce.', nonceResponse, publicKey.hex)
        throw new Error(t('error.loadingData'))
      }

      const dataWithAuth = {
        ...data,
        auth: {
          type: signatureType,
          nonce: nonceResponse.nonce,
          chainId: chainInfo.chainId,
          chainFeeDenom: chainInfo.feeCurrencies[0].coinMinimalDenom,
          chainBech32Prefix: chainInfo.bech32Config.bech32PrefixAccAddr,
          publicKey: publicKey.hex,
        },
      }

      // Sign data.
      const offlineSignerAmino = await walletClient.getOfflineSignerOnlyAmino(
        chainInfo.chainId
      )
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
        chainInfo.chainId,
        '',
        0,
        0
      )
      const {
        signature: { signature },
      } = await offlineSignerAmino.signAmino(walletAddress, signDocAmino)

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
      apiBase,
      chainInfo,
      publicKey,
      signatureType,
      t,
      walletAddress,
      walletClient,
      ready,
    ]
  )

  return { ready, postRequest }
}
