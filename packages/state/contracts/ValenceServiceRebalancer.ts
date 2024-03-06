import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Addr } from '@dao-dao/types'
import {
  ManagersAddrsResponse,
  NullableCoin,
  PauseData,
  QueryFeeAction,
  RebalancerAdminMsg,
  RebalancerConfig,
  RebalancerData,
  RebalancerUpdateData,
  SystemRebalanceStatus,
  WhitelistsResponse,
} from '@dao-dao/types/contracts/ValenceServiceRebalancer'

export interface ValenceServiceRebalancerReadOnlyInterface {
  contractAddress: string
  getConfig: ({ addr }: { addr: string }) => Promise<RebalancerConfig>
  getPausedConfig: ({ addr }: { addr: string }) => Promise<PauseData>
  getSystemStatus: () => Promise<SystemRebalanceStatus>
  getServiceFee: ({
    account,
    action,
  }: {
    account: string
    action: QueryFeeAction
  }) => Promise<NullableCoin>
  getWhiteLists: () => Promise<WhitelistsResponse>
  getManagersAddrs: () => Promise<ManagersAddrsResponse>
  getAdmin: () => Promise<Addr>
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
    this.getPausedConfig = this.getPausedConfig.bind(this)
    this.getSystemStatus = this.getSystemStatus.bind(this)
    this.getServiceFee = this.getServiceFee.bind(this)
    this.getWhiteLists = this.getWhiteLists.bind(this)
    this.getManagersAddrs = this.getManagersAddrs.bind(this)
    this.getAdmin = this.getAdmin.bind(this)
  }

  getConfig = async ({ addr }: { addr: string }): Promise<RebalancerConfig> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_config: {
        addr,
      },
    })
  }
  getPausedConfig = async ({ addr }: { addr: string }): Promise<PauseData> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_paused_config: {
        addr,
      },
    })
  }
  getSystemStatus = async (): Promise<SystemRebalanceStatus> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_system_status: {},
    })
  }
  getServiceFee = async ({
    account,
    action,
  }: {
    account: string
    action: QueryFeeAction
  }): Promise<NullableCoin> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_service_fee: {
        account,
        action,
      },
    })
  }
  getWhiteLists = async (): Promise<WhitelistsResponse> => {
    return this.client.queryContractSmart(
      this.contractAddress,
      'get_white_lists'
    )
  }
  getManagersAddrs = async (): Promise<ManagersAddrsResponse> => {
    return this.client.queryContractSmart(
      this.contractAddress,
      'get_managers_addrs'
    )
  }
  getAdmin = async (): Promise<Addr> => {
    return this.client.queryContractSmart(this.contractAddress, 'get_admin')
  }
}
export interface ValenceServiceRebalancerInterface
  extends ValenceServiceRebalancerReadOnlyInterface {
  contractAddress: string
  sender: string
  admin: (
    rebalancerAdminMsg: RebalancerAdminMsg,
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
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
      reason,
      sender,
    }: {
      pauseFor: string
      reason?: string
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
    this.admin = this.admin.bind(this)
    this.systemRebalance = this.systemRebalance.bind(this)
    this.register = this.register.bind(this)
    this.deregister = this.deregister.bind(this)
    this.update = this.update.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
  }

  admin = async (
    rebalancerAdminMsg: RebalancerAdminMsg,
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        admin: rebalancerAdminMsg,
      },
      fee,
      memo,
      _funds
    )
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
      reason,
      sender,
    }: {
      pauseFor: string
      reason?: string
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
          reason,
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
