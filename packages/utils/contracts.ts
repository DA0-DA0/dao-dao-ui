import { ExecuteResult, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import {
  Coin,
  DeliverTxResponse,
  SigningStargateClient,
  isDeliverTxFailure,
} from '@cosmjs/stargate'
import { parseRawLog } from '@cosmjs/stargate/build/logs'
import { SecretNetworkClient, toUtf8 } from 'secretjs'

import { ContractVersion } from '@dao-dao/types'
import {
  MsgExecuteContract,
  MsgInstantiateContract,
} from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'

import { findEventsAttributeValue } from './client'
import { CHAIN_GAS_MULTIPLIER } from './constants'

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

type SupportedClient =
  | SigningCosmWasmClient
  | SigningStargateClient
  | SecretNetworkClient

/**
 * Instantiate a smart contract from any supported client.
 *
 * This uses our custom instantiate encoder since CosmJS is unreliable due to
 * the SDK version (47+) change that improperly handles the optional admin field
 * as an empty string. The normal signing client `instantiate` function is thus
 * no longer reliable.
 */
export const instantiateSmartContract = async (
  client: SupportedClient | (() => Promise<SupportedClient>),
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

  if (client instanceof SecretNetworkClient) {
    const { transactionHash, arrayLog } =
      await client.tx.compute.instantiateContract(
        {
          sender,
          code_id: codeId,
          label,
          init_msg: msg,
          init_funds: funds,
          code_hash: undefined,
          admin: typeof admin === 'string' ? admin : undefined,
        },
        {
          memo,
          // TODO(secret): fee ???
          gasLimit: fee,
        }
      )

    const contractAddress = arrayLog?.find(
      (log) => log.type === 'message' && log.key === 'contract_address'
    )?.value

    if (!contractAddress) {
      throw new Error(`Contract address not found for TX: ${transactionHash}`)
    }

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
  client: SupportedClient | (() => Promise<SupportedClient>),
  sender: string,
  contractAddress: string,
  msg: object,
  funds?: Coin[],
  fee = CHAIN_GAS_MULTIPLIER,
  memo: string | undefined = undefined
): Promise<ExecuteResult> => {
  client = typeof client === 'function' ? await client() : client

  if (client instanceof SecretNetworkClient) {
    const result = await client.tx.compute.executeContract(
      {
        sender,
        contract_address: contractAddress,
        msg,
        sent_funds: funds,
        code_hash: undefined,
      },
      {
        memo,
        // TODO(secret): fee ???
        gasLimit: fee,
      }
    )

    const parsedLogs = parseRawLog(result.rawLog)

    return {
      logs: parsedLogs,
      height: result.height,
      transactionHash: result.transactionHash,
      events: result.jsonLog?.flatMap((log) => log.events) || [],
      gasWanted: BigInt(Math.round(result.gasWanted)),
      gasUsed: BigInt(Math.round(result.gasUsed)),
    }
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
