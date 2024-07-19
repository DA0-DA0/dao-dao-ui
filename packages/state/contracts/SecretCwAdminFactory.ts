import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Binary, Coin } from '@dao-dao/types/contracts/SecretCwAdminFactory'

export interface SecretCwAdminFactoryReadOnlyInterface {
  contractAddress: string
}
export class SecretCwAdminFactoryQueryClient
  implements SecretCwAdminFactoryReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string
  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
  }
}
export interface SecretCwAdminFactoryInterface
  extends SecretCwAdminFactoryReadOnlyInterface {
  contractAddress: string
  sender: string
  instantiateContractWithSelfAdmin: (
    {
      instantiateMsg,
      codeId,
      codeHash,
      label,
    }: {
      instantiateMsg: Binary
      codeId: number
      codeHash: string
      label: string
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class SecretCwAdminFactoryClient
  extends SecretCwAdminFactoryQueryClient
  implements SecretCwAdminFactoryInterface
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
    this.instantiateContractWithSelfAdmin =
      this.instantiateContractWithSelfAdmin.bind(this)
  }
  instantiateContractWithSelfAdmin = async (
    {
      instantiateMsg,
      codeId,
      codeHash,
      label,
    }: {
      instantiateMsg: Binary
      codeId: number
      codeHash: string
      label: string
    },
    fee: number = 1_000_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        instantiate_contract_with_self_admin: {
          instantiate_msg: instantiateMsg,
          code_id: codeId,
          code_hash: codeHash,
          label,
        },
      },
      fee,
      memo,
      _funds
    )
  }
}
