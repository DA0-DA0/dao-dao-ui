import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Coin, SigningStargateClient } from '@cosmjs/stargate'

import { ContractVersion, cwMsgToEncodeObject } from '@dao-dao/types'

import { findEventsAttributeValue } from './client'
import { CHAIN_GAS_MULTIPLIER } from './constants'
import { encodeJsonToBase64 } from './messages'

const CONTRACT_VERSIONS = Object.values(ContractVersion)

// If version is defined, returns it. Otherwise, returns `undefined`.
// Essentially just filters version by its presence in the `ContractVersion`
// enum.
export const parseContractVersion = (
  version: string
): ContractVersion | undefined => CONTRACT_VERSIONS.find((v) => v === version)

export const indexToProposalModulePrefix = (index: number) => {
  index += 1
  let prefix = ''
  while (index > 0) {
    const letterIndex = (index - 1) % 26
    // capital A = 65, Z = 90
    prefix = String.fromCharCode('A'.charCodeAt(0) + letterIndex) + prefix
    index = ((index - letterIndex) / 26) | 0
  }

  return prefix
}

// Use our custom instantiate encoder since CosmJS is unreliable due to the SDK
// version (47+) change that improperly handles the optional admin field as an
// empty string. The normal signing client `instantiate` function is thus no
// longer reliable.
export const instantiateSmartContract = async (
  client: SigningCosmWasmClient | SigningStargateClient,
  sender: string,
  codeId: number,
  label: string,
  msg: unknown,
  funds?: Coin[],
  admin?: string | null
): Promise<string> => {
  const { events } = await client.signAndBroadcast(
    sender,
    [
      cwMsgToEncodeObject(
        {
          wasm: {
            instantiate: {
              code_id: codeId,
              msg: encodeJsonToBase64(msg),
              funds: funds || [],
              label,
              // Replace empty string with undefined.
              admin: admin || undefined,
            },
          },
        },
        sender
      ),
    ],
    CHAIN_GAS_MULTIPLIER
  )

  const contractAddress = findEventsAttributeValue(
    events,
    'instantiate',
    '_contract_address'
  )

  if (!contractAddress) {
    throw new Error('Contract address not found')
  }

  return contractAddress
}
