import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Addr, Binary } from '@dao-dao/types/contracts/common'
import {
  Callback,
  ResultResponse,
} from '@dao-dao/types/contracts/PolytoneListener'

export interface PolytoneListenerReadOnlyInterface {
  contractAddress: string
  note: () => Promise<string>
  result: ({
    initiator,
    initiatorMsg,
  }: {
    initiator: string
    initiatorMsg: string
  }) => Promise<ResultResponse>
}
export class PolytoneListenerQueryClient
  implements PolytoneListenerReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.note = this.note.bind(this)
    this.result = this.result.bind(this)
  }

  note = async (): Promise<string> => {
    return this.client.queryContractSmart(this.contractAddress, {
      note: {},
    })
  }
  result = async ({
    initiator,
    initiatorMsg,
  }: {
    initiator: string
    initiatorMsg: string
  }): Promise<ResultResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      result: {
        initiator,
        initiator_msg: initiatorMsg,
      },
    })
  }
}
export interface PolytoneListenerInterface
  extends PolytoneListenerReadOnlyInterface {
  contractAddress: string
  sender: string
  callback: (
    {
      initiator,
      initiatorMsg,
      result,
    }: {
      initiator: Addr
      initiatorMsg: Binary
      result: Callback
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class PolytoneListenerClient
  extends PolytoneListenerQueryClient
  implements PolytoneListenerInterface
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
    this.callback = this.callback.bind(this)
  }

  callback = async (
    {
      initiator,
      initiatorMsg,
      result,
    }: {
      initiator: Addr
      initiatorMsg: Binary
      result: Callback
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        callback: {
          initiator,
          initiator_msg: initiatorMsg,
          result,
        },
      },
      fee,
      memo,
      funds
    )
  }
}
