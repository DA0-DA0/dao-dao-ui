import { ExecuteResult, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import {
  Coin,
  DeliverTxResponse,
  SigningStargateClient,
  isDeliverTxFailure,
} from '@cosmjs/stargate'
import { parseRawLog } from '@cosmjs/stargate/build/logs'
import { toUtf8 } from 'secretjs'

import { ContractVersion } from '@dao-dao/types'
import {
  MsgExecuteContract,
  MsgInstantiateContract,
} from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'

import { findEventsAttributeValue } from './client'
import { CHAIN_GAS_MULTIPLIER } from './constants'
import { SecretSigningCosmWasmClient } from './secret'

const CONTRACT_VERSIONS = Object.values(ContractVersion)

// If version is defined, returns it. Otherwise, returns
// ContractVersion.Unknown.
export const parseContractVersion = (version: string): ContractVersion =>
  CONTRACT_VERSIONS.find((v) => v === version) || ContractVersion.Unknown

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

export type SupportedCosmWasmClient =
  | SigningStargateClient
  | SigningCosmWasmClient
  | SecretSigningCosmWasmClient

/**
 * Instantiate a smart contract from any supported client.
 *
 * This uses our custom instantiate encoder since CosmJS is unreliable due to
 * the SDK version (47+) change that improperly handles the optional admin field
 * as an empty string. The normal signing client `instantiate` function is thus
 * no longer reliable.
 */
export const instantiateSmartContract = async (
  client: SupportedCosmWasmClient | (() => Promise<SupportedCosmWasmClient>),
  sender: string,
  codeId: number,
  label: string,
  msg: object,
  funds?: Coin[],
  admin?: string | null,
  fee = CHAIN_GAS_MULTIPLIER,
  memo: string | undefined = undefined
): Promise<string> => {
  client = typeof client === 'function' ? await client() : client

  if (client instanceof SecretSigningCosmWasmClient) {
    const { contractAddress } = await client.instantiate(
      sender,
      codeId,
      msg,
      label,
      fee,
      {
        funds,
        admin: typeof admin === 'string' ? admin : undefined,
        memo,
      }
    )

    return contractAddress
  } else {
    const result = await client.signAndBroadcast(
      sender,
      [
        {
          typeUrl: MsgInstantiateContract.typeUrl,
          value: MsgInstantiateContract.fromPartial({
            sender,
            admin: admin ?? undefined,
            codeId: BigInt(codeId),
            label,
            msg: toUtf8(JSON.stringify(msg)),
            funds,
          }),
        },
      ],
      fee,
      memo
    )

    if (isDeliverTxFailure(result)) {
      throw new Error(createDeliverTxResponseErrorMessage(result))
    }

    const contractAddress = findEventsAttributeValue(
      result.events,
      'instantiate',
      '_contract_address'
    )

    if (!contractAddress) {
      throw new Error(
        `Contract address not found for TX: ${result.transactionHash}`
      )
    }

    return contractAddress
  }
}

/**
 * Execute a smart contract from any supported client.
 */
export const executeSmartContract = async (
  client: SupportedCosmWasmClient | (() => Promise<SupportedCosmWasmClient>),
  sender: string,
  contractAddress: string,
  msg: object,
  funds?: Coin[],
  fee = CHAIN_GAS_MULTIPLIER,
  memo: string | undefined = undefined
): Promise<ExecuteResult> => {
  client = typeof client === 'function' ? await client() : client

  if (client instanceof SecretSigningCosmWasmClient) {
    return await client.execute(sender, contractAddress, msg, fee, memo, funds)
  } else {
    const result = await client.signAndBroadcast(
      sender,
      [
        {
          typeUrl: MsgExecuteContract.typeUrl,
          value: MsgExecuteContract.fromPartial({
            sender,
            contract: contractAddress,
            msg: toUtf8(JSON.stringify(msg)),
            funds,
          }),
        },
      ],
      fee,
      memo
    )

    if (isDeliverTxFailure(result)) {
      throw new Error(createDeliverTxResponseErrorMessage(result))
    }

    return {
      logs: parseRawLog(result.rawLog),
      height: result.height,
      transactionHash: result.transactionHash,
      events: result.events,
      gasWanted: result.gasWanted,
      gasUsed: result.gasUsed,
    }
  }
}

const createDeliverTxResponseErrorMessage = (result: DeliverTxResponse) =>
  `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`
