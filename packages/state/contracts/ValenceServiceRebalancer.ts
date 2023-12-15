import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  RebalancerConfig,
  RebalancerData,
  RebalancerUpdateData,
  SystemRebalanceStatus,
} from '@dao-dao/types/contracts/ValenceServiceRebalancer'

export interface ValenceServiceRebalancerReadOnlyInterface {
  contractAddress: string
  getConfig: ({ addr }: { addr: string }) => Promise<RebalancerConfig>
  getSystemStatus: () => Promise<SystemRebalanceStatus>
}
export class ValenceServiceRebalancerQueryClient
  implements ValenceServiceRebalancerReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.getConfig = this.getConfig.bind(this)
    this.getSystemStatus = this.getSystemStatus.bind(this)
  }

  getConfig = async ({ addr }: { addr: string }): Promise<RebalancerConfig> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_config: {
        addr,
      },
    })
  }
  getSystemStatus = async (): Promise<SystemRebalanceStatus> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_system_status: {},
    })
  }
}
export interface ValenceServiceRebalancerInterface
  extends ValenceServiceRebalancerReadOnlyInterface {
  contractAddress: string
  sender: string
  systemRebalance: (
    {
      limit,
    }: {
      limit?: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  register: (
    {
      data,
      registerFor,
    }: {
      data?: RebalancerData
      registerFor: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  deregister: (
    {
      deregisterFor,
    }: {
      deregisterFor: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  update: (
    {
      data,
      updateFor,
    }: {
      data: RebalancerUpdateData
      updateFor: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  pause: (
    {
      pauseFor,
      sender,
    }: {
      pauseFor: string
      sender: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  resume: (
    {
      resumeFor,
      sender,
    }: {
      resumeFor: string
      sender: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class ValenceServiceRebalancerClient
  extends ValenceServiceRebalancerQueryClient
  implements ValenceServiceRebalancerInterface
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
    this.systemRebalance = this.systemRebalance.bind(this)
    this.register = this.register.bind(this)
    this.deregister = this.deregister.bind(this)
    this.update = this.update.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
  }

  systemRebalance = async (
    {
      limit,
    }: {
      limit?: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        system_rebalance: {
          limit,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  register = async (
    {
      data,
      registerFor,
    }: {
      data?: RebalancerData
      registerFor: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        register: {
          data,
          register_for: registerFor,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  deregister = async (
    {
      deregisterFor,
    }: {
      deregisterFor: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        deregister: {
          deregister_for: deregisterFor,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  update = async (
    {
      data,
      updateFor,
    }: {
      data: RebalancerUpdateData
      updateFor: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update: {
          data,
          update_for: updateFor,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  pause = async (
    {
      pauseFor,
      sender,
    }: {
      pauseFor: string
      sender: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        pause: {
          pause_for: pauseFor,
          sender,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  resume = async (
    {
      resumeFor,
      sender,
    }: {
      resumeFor: string
      sender: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        resume: {
          resume_for: resumeFor,
          sender,
        },
      },
      fee,
      memo,
      _funds
    )
  }
}
