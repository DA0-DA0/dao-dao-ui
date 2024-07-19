import { AminoSignResponse, StdSignDoc, makeSignDoc } from '@cosmjs/amino'

import { PermitForPermitData } from '@dao-dao/types'

import { encodeJsonToBase64 } from '../messages'

export type CreateSecretNetworkPermitSignAmino = (
  signDoc: StdSignDoc,
  signOptions: {
    // Needed so that we can manually set gas and fees.
    preferNoSetFee: true
  }
) => Promise<AminoSignResponse>

export type CreateSecretNetworkPermitOptions = {
  /**
   * Chain ID.
   */
  chainId: string
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
  signAmino: CreateSecretNetworkPermitSignAmino
}

/**
 * Function to create Secret Network permit.
 */
export const createSecretNetworkPermit = async ({
  chainId,
  key,
  data = {},
  signAmino,
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

  const { signed, signature } = await signAmino(signDoc, {
    // Needed so that we can manually set gas and fees.
    preferNoSetFee: true,
  })

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
