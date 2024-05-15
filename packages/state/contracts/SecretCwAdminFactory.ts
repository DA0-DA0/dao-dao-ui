import { StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  Coin,
  ModuleInstantiateInfo,
} from '@dao-dao/types/contracts/SecretCwAdminFactory'

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
      moduleInfo,
    }: {
      moduleInfo: ModuleInstantiateInfo
    },
    fee?: number | StdFee | 'auto',
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
      moduleInfo,
    }: {
      moduleInfo: ModuleInstantiateInfo
    },
    fee: number | StdFee | 'auto' = {
      amount: [
        {
          amount: BigInt(1 * 10 ** 5).toString(),
          denom: 'uscrt',
        },
      ],
      gas: '150000',
    },
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        instantiate_contract_with_self_admin: {
          module_info: moduleInfo,
        },
      },
      fee,
      memo,
      _funds
    )
  }
}
