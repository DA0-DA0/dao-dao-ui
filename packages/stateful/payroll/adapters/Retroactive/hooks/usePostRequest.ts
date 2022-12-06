import { makeSignDoc } from '@cosmjs/amino'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/stateless'

import { API_BASE, SIGNATURE_TYPE } from '../constants'

export const usePostRequest = () => {
  const { t } = useTranslation()
  const { chainId } = useDaoInfoContext()
  const {
    walletClient,
    publicKey,
    chainInfo,
    address: walletAddress,
  } = useWallet(chainId)

  const postRequest = useCallback(
    async (endpoint: string, data?: Record<string, unknown>) => {
      if (!walletClient || !publicKey || !chainInfo || !walletAddress) {
        throw new Error(t('error.connectWalletToContinue'))
      }

      // Fetch nonce.
      const nonceResponse: { nonce: number } = await (
        await fetch(`${API_BASE}/nonce/${publicKey.hex}`)
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
          type: SIGNATURE_TYPE,
          nonce: nonceResponse.nonce,
          chainId,
          chainFeeDenom: chainInfo.feeCurrencies[0].coinMinimalDenom,
          chainBech32Prefix: chainInfo.bech32Config.bech32PrefixAccAddr,
          publicKey: publicKey.hex,
        },
      }

      // Sign data.
      const offlineSignerAmino = await walletClient.getOfflineSignerOnlyAmino(
        chainId
      )
      const signDocAmino = makeSignDoc(
        [
          {
            type: SIGNATURE_TYPE,
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
        chainId,
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
      const response = await fetch(API_BASE + endpoint, {
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
    [chainId, chainInfo, publicKey, t, walletAddress, walletClient]
  )

  return postRequest
}
