import { OfflineAminoSigner, makeSignDoc } from '@cosmjs/amino'

import { PermitForPermitData } from '@dao-dao/types'

import { encodeJsonToBase64 } from '../messages'

export type CreateSecretNetworkPermitOptions = {
  /**
   * Chain ID.
   */
  chainId: string
  /**
   * Wallet address.
   */
  address: string
  /**
   * Arbitrary string.
   */
  key: string
  /**
   * Optional data object. Defaults to empty object.
   */
  data?: Record<string, any>
  /**
   * Offline Amino signer that corresponds with chain ID and wallet address.
   */
  offlineSignerAmino: OfflineAminoSigner
}

/**
 * Function to create Secret Network permit.
 */
export const createSecretNetworkPermit = async ({
  chainId,
  address,
  key,
  data = {},
  offlineSignerAmino,
}: CreateSecretNetworkPermitOptions): Promise<PermitForPermitData> => {
  const encodedData = encodeJsonToBase64(data)

  // Generate data to sign.
  const signDoc = makeSignDoc(
    [
      {
        type: 'signature_proof',
        value: {
          key,
          data: encodedData,
        },
      },
    ],
    {
      gas: '1',
      amount: [
        {
          denom: 'uscrt',
          amount: '0',
        },
      ],
    },
    chainId,
    '',
    0,
    0
  )

  const { signed, signature } = await offlineSignerAmino.signAmino(
    address,
    signDoc
  )

  const permit: PermitForPermitData = {
    account_number: signed.account_number,
    chain_id: signed.chain_id,
    memo: signed.memo,
    params: {
      key,
      data: encodedData,
    },
    sequence: signed.sequence,
    signature,
  }

  return permit
}
