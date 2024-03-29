import { StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  InstantiateOptions,
  InstantiateResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  Addr,
  Coin,
  CosmosMsgForEmpty,
  Duration,
  ModuleInstantiateInfo,
} from '@dao-dao/types/contracts/common'
import {
  AdminResponse,
  Config,
  ConfigResponse,
  Cw20BalancesResponse,
  Cw20TokenListResponse,
  Cw721TokenListResponse,
  DumpStateResponse,
  GetItemResponse,
  InfoResponse,
  InstantiateMsg,
  ListItemsResponse,
  PauseInfoResponse,
  ProposalModulesResponse,
  TotalPowerAtHeightResponse,
  VotingModuleResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/CwCore.v1'
import { CHAIN_GAS_MULTIPLIER } from '@dao-dao/utils'

export interface CwCoreV1ReadOnlyInterface {
  contractAddress: string
  admin: () => Promise<AdminResponse>
  config: () => Promise<ConfigResponse>
  cw20Balances: ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }) => Promise<Cw20BalancesResponse>
  cw20TokenList: ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }) => Promise<Cw20TokenListResponse>
  cw721TokenList: ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }) => Promise<Cw721TokenListResponse>
  dumpState: () => Promise<DumpStateResponse>
  getItem: ({ key }: { key: string }) => Promise<GetItemResponse>
  listItems: ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }) => Promise<ListItemsResponse>
  proposalModules: ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }) => Promise<ProposalModulesResponse>
  pauseInfo: () => Promise<PauseInfoResponse>
  votingModule: () => Promise<VotingModuleResponse>
  votingPowerAtHeight: ({
    address,
    height,
  }: {
    address: string
    height?: number
  }) => Promise<VotingPowerAtHeightResponse>
  totalPowerAtHeight: ({
    height,
  }: {
    height?: number
  }) => Promise<TotalPowerAtHeightResponse>
  info: () => Promise<InfoResponse>
}
export class CwCoreV1QueryClient implements CwCoreV1ReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.admin = this.admin.bind(this)
    this.config = this.config.bind(this)
    this.cw20Balances = this.cw20Balances.bind(this)
    this.cw20TokenList = this.cw20TokenList.bind(this)
    this.cw721TokenList = this.cw721TokenList.bind(this)
    this.dumpState = this.dumpState.bind(this)
    this.getItem = this.getItem.bind(this)
    this.listItems = this.listItems.bind(this)
    this.proposalModules = this.proposalModules.bind(this)
    this.pauseInfo = this.pauseInfo.bind(this)
    this.votingModule = this.votingModule.bind(this)
    this.votingPowerAtHeight = this.votingPowerAtHeight.bind(this)
    this.totalPowerAtHeight = this.totalPowerAtHeight.bind(this)
    this.info = this.info.bind(this)
  }

  admin = async (): Promise<AdminResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      admin: {},
    })
  }
  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    })
  }
  cw20Balances = async ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }): Promise<Cw20BalancesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      cw20_balances: {
        limit,
        start_at: startAt,
      },
    })
  }
  cw20TokenList = async ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }): Promise<Cw20TokenListResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      cw20_token_list: {
        limit,
        start_at: startAt,
      },
    })
  }
  cw721TokenList = async ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }): Promise<Cw721TokenListResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      cw721_token_list: {
        limit,
        start_at: startAt,
      },
    })
  }
  dumpState = async (): Promise<DumpStateResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      dump_state: {},
    })
  }
  getItem = async ({ key }: { key: string }): Promise<GetItemResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_item: {
        key,
      },
    })
  }
  listItems = async ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }): Promise<ListItemsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_items: {
        limit,
        start_at: startAt,
      },
    })
  }
  proposalModules = async ({
    limit,
    startAt,
  }: {
    limit?: number
    startAt?: string
  }): Promise<ProposalModulesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_modules: {
        limit,
        start_at: startAt,
      },
    })
  }
  pauseInfo = async (): Promise<PauseInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      pause_info: {},
    })
  }
  votingModule = async (): Promise<VotingModuleResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voting_module: {},
    })
  }
  votingPowerAtHeight = async ({
    address,
    height,
  }: {
    address: string
    height?: number
  }): Promise<VotingPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voting_power_at_height: {
        address,
        height,
      },
    })
  }
  totalPowerAtHeight = async ({
    height,
  }: {
    height?: number
  }): Promise<TotalPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_power_at_height: {
        height,
      },
    })
  }
  info = async (): Promise<InfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      info: {},
    })
  }
}
export interface CwCoreV1Interface extends CwCoreV1ReadOnlyInterface {
  contractAddress: string
  sender: string
  instantiate: (
    codeId: number,
    msg: InstantiateMsg,
    label: string,
    fee?: number | StdFee | 'auto',
    options?: InstantiateOptions
  ) => Promise<InstantiateResult>
  executeAdminMsgs: (
    {
      msgs,
    }: {
      msgs: CosmosMsgForEmpty[]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  executeProposalHook: (
    {
      msgs,
    }: {
      msgs: CosmosMsgForEmpty[]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  pause: (
    {
      duration,
    }: {
      duration: Duration
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  receive: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  receiveNft: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  removeItem: (
    {
      key,
    }: {
      key: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  setItem: (
    {
      addr,
      key,
    }: {
      addr: string
      key: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  updateAdmin: (
    {
      admin,
    }: {
      admin?: Addr
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      config,
    }: {
      config: Config
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  updateCw20List: (
    {
      toAdd,
      toRemove,
    }: {
      toAdd: string[]
      toRemove: string[]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  updateCw721List: (
    {
      toAdd,
      toRemove,
    }: {
      toAdd: string[]
      toRemove: string[]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  updateProposalModules: (
    {
      toAdd,
      toRemove,
    }: {
      toAdd: ModuleInstantiateInfo[]
      toRemove: string[]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  updateVotingModule: (
    {
      module,
    }: {
      module: ModuleInstantiateInfo
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
}
export class CwCoreV1Client
  extends CwCoreV1QueryClient
  implements CwCoreV1Interface
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
    this.instantiate = this.instantiate.bind(this)
    this.executeAdminMsgs = this.executeAdminMsgs.bind(this)
    this.executeProposalHook = this.executeProposalHook.bind(this)
    this.pause = this.pause.bind(this)
    this.receive = this.receive.bind(this)
    this.receiveNft = this.receiveNft.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.setItem = this.setItem.bind(this)
    this.updateAdmin = this.updateAdmin.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.updateCw20List = this.updateCw20List.bind(this)
    this.updateCw721List = this.updateCw721List.bind(this)
    this.updateProposalModules = this.updateProposalModules.bind(this)
    this.updateVotingModule = this.updateVotingModule.bind(this)
  }

  instantiate = async (
    codeId: number,
    msg: InstantiateMsg,
    label: string,
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    options?: InstantiateOptions
  ): Promise<InstantiateResult> => {
    return await this.client.instantiate(
      this.sender,
      codeId,
      msg,
      label,
      fee,
      options
    )
  }

  executeAdminMsgs = async (
    {
      msgs,
    }: {
      msgs: CosmosMsgForEmpty[]
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        execute_admin_msgs: {
          msgs,
        },
      },
      fee,
      memo,
      funds
    )
  }
  executeProposalHook = async (
    {
      msgs,
    }: {
      msgs: CosmosMsgForEmpty[]
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        execute_proposal_hook: {
          msgs,
        },
      },
      fee,
      memo,
      funds
    )
  }
  pause = async (
    {
      duration,
    }: {
      duration: Duration
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        pause: {
          duration,
        },
      },
      fee,
      memo,
      funds
    )
  }
  receive = async (
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        receive: {},
      },
      fee,
      memo,
      funds
    )
  }
  receiveNft = async (
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        receive_nft: {},
      },
      fee,
      memo,
      funds
    )
  }
  removeItem = async (
    {
      key,
    }: {
      key: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_item: {
          key,
        },
      },
      fee,
      memo,
      funds
    )
  }
  setItem = async (
    {
      addr,
      key,
    }: {
      addr: string
      key: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        set_item: {
          addr,
          key,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updateAdmin = async (
    {
      admin,
    }: {
      admin?: Addr
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_admin: {
          admin,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updateConfig = async (
    {
      config,
    }: {
      config: Config
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          config,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updateCw20List = async (
    {
      toAdd,
      toRemove,
    }: {
      toAdd: string[]
      toRemove: string[]
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_cw20_list: {
          to_add: toAdd,
          to_remove: toRemove,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updateCw721List = async (
    {
      toAdd,
      toRemove,
    }: {
      toAdd: string[]
      toRemove: string[]
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_cw721_list: {
          to_add: toAdd,
          to_remove: toRemove,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updateProposalModules = async (
    {
      toAdd,
      toRemove,
    }: {
      toAdd: ModuleInstantiateInfo[]
      toRemove: string[]
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_proposal_modules: {
          to_add: toAdd,
          to_remove: toRemove,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updateVotingModule = async (
    {
      module,
    }: {
      module: ModuleInstantiateInfo
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_voting_module: {
          module,
        },
      },
      fee,
      memo,
      funds
    )
  }
}
