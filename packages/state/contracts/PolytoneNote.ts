import { StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  Coin,
  CosmosMsgForEmpty,
  Uint64,
} from '@dao-dao/types/contracts/common'
import {
  CallbackRequest,
  NullableString,
  QueryRequestForEmpty,
} from '@dao-dao/types/contracts/PolytoneNote'
import { CHAIN_GAS_MULTIPLIER } from '@dao-dao/utils'

export interface PolytoneNoteReadOnlyInterface {
  contractAddress: string
  remoteAddress: ({
    localAddress,
  }: {
    localAddress: string
  }) => Promise<NullableString>
}
export class PolytoneNoteQueryClient implements PolytoneNoteReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.remoteAddress = this.remoteAddress.bind(this)
  }

  remoteAddress = async ({
    localAddress,
  }: {
    localAddress: string
  }): Promise<NullableString> => {
    return this.client.queryContractSmart(this.contractAddress, {
      remote_address: {
        local_address: localAddress,
      },
    })
  }
}
export interface PolytoneNoteInterface extends PolytoneNoteReadOnlyInterface {
  contractAddress: string
  sender: string
  query: (
    {
      callback,
      msgs,
      timeoutSeconds,
    }: {
      callback: CallbackRequest
      msgs: QueryRequestForEmpty[]
      timeoutSeconds: Uint64
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  execute: (
    {
      callback,
      msgs,
      onBehalfOf,
      timeoutSeconds,
    }: {
      callback?: CallbackRequest
      msgs: CosmosMsgForEmpty[]
      onBehalfOf?: string
      timeoutSeconds: Uint64
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class PolytoneNoteClient
  extends PolytoneNoteQueryClient
  implements PolytoneNoteInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.query = this.query.bind(this)
    this.execute = this.execute.bind(this)
  }

  query = async (
    {
      callback,
      msgs,
      timeoutSeconds,
    }: {
      callback: CallbackRequest
      msgs: QueryRequestForEmpty[]
      timeoutSeconds: Uint64
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        query: {
          callback,
          msgs,
          timeout_seconds: timeoutSeconds,
        },
      },
      fee,
      memo,
      funds
    )
  }
  execute = async (
    {
      callback,
      msgs,
      onBehalfOf,
      timeoutSeconds,
    }: {
      callback?: CallbackRequest
      msgs: CosmosMsgForEmpty[]
      onBehalfOf?: string
      timeoutSeconds: Uint64
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        execute: {
          callback,
          msgs,
          on_behalf_of: onBehalfOf,
          timeout_seconds: timeoutSeconds,
        },
      },
      fee,
      memo,
      funds
    )
  }
}
