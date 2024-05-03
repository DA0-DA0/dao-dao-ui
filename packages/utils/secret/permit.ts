import { OfflineAminoSigner, makeSignDoc } from '@cosmjs/amino'

export type CreateSecretNetworkPermitOptions = {
  chainId: string
  address: string
  key: string
  offlineSignerAmino: OfflineAminoSigner
}

/**
 * Function to create Secret Network permit.
 */
export const createSecretNetworkPermit = async ({
  chainId,
  address,
  key,
  offlineSignerAmino,
}: CreateSecretNetworkPermitOptions) => {
  // Generate data to sign.
  const signDoc = makeSignDoc(
    [
      {
        type: 'signature_proof',
        value: {
          key,
          // base64-encoded `{}` (empty JSON object)
          data: 'e30=',
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

  const { signature } = await offlineSignerAmino.signAmino(address, signDoc)

  return {
    signDoc,
    signature,
  }
}
