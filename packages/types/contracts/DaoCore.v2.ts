import {
  Addr,
  Binary,
  ContractVersionInfo,
  CosmosMsgForEmpty,
  Duration,
  Expiration,
  ModuleInstantiateInfo,
  Timestamp,
  Uint128,
} from './common'

// v2 changed case.
export type ProposalModuleStatus =
  | 'enabled'
  | 'Enabled'
  | 'disabled'
  | 'Disabled'
export type ActiveProposalModulesResponse = ProposalModule[]
export interface ProposalModule {
  address: Addr
  prefix: string
  status: ProposalModuleStatus
}
export interface AdminNominationResponse {
  nomination?: Addr | null
}
export type AdminResponse = Addr | null
export interface ConfigResponse {
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  dao_uri?: string | null
  description: string
  image_url?: string | null
  name: string
}
export interface Cw20BalanceResponse {
  addr: Addr
  balance: Uint128
}
export type Cw20BalancesResponse = Cw20BalanceResponse[]
export type Cw20TokenListResponse = Addr[]
export type Cw721TokenListResponse = Addr[]
export type DaoURIResponse = string | null
// v2 changed case.
export type PauseInfoResponse =
  | {
      Paused: {
        expiration: Expiration
      }
    }
  | {
      paused: {
        expiration: Expiration
      }
    }
  // Neutron SubDAOs:
  // https://github.com/neutron-org/neutron-dao/blob/v0.5.0/packages/exec-control/src/pause.rs#L56-L62
  | {
      Paused: {
        until_height: number
      }
    }
  | {
      Unpaused: {}
    }
  | {
      unpaused: {}
    }
export interface DumpStateResponse {
  active_proposal_module_count: number
  admin: Addr
  config: Config
  created_timestamp?: Timestamp | null
  pause_info: PauseInfoResponse
  proposal_modules: ProposalModule[]
  total_proposal_module_count: number
  version: ContractVersionInfo
  voting_module: Addr
}
export interface Config {
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  dao_uri?: string | null
  description: string
  image_url?: string | null
  name: string
}
export type ExecuteMsg =
  | {
      execute_admin_msgs: {
        msgs: CosmosMsgForEmpty[]
      }
    }
  | {
      execute_proposal_hook: {
        msgs: CosmosMsgForEmpty[]
      }
    }
  | {
      pause: {
        duration: Duration
      }
    }
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      receive_nft: Cw721ReceiveMsg
    }
  | {
      remove_item: {
        key: string
      }
    }
  | {
      set_item: {
        addr: string
        key: string
      }
    }
  | {
      nominate_admin: {
        admin?: string | null
      }
    }
  | {
      accept_admin_nomination: {}
    }
  | {
      withdraw_admin_nomination: {}
    }
  | {
      update_config: {
        config: Config
      }
    }
  | {
      update_cw20_list: {
        to_add: string[]
        to_remove: string[]
      }
    }
  | {
      update_cw721_list: {
        to_add: string[]
        to_remove: string[]
      }
    }
  | {
      update_proposal_modules: {
        to_add: ModuleInstantiateInfo[]
        to_disable: string[]
      }
    }
  | {
      update_voting_module: {
        module: ModuleInstantiateInfo
      }
    }
  | {
      update_sub_daos: {
        to_add: SubDao[]
        to_remove: string[]
      }
    }
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
}
export interface Cw721ReceiveMsg {
  msg: Binary
  sender: string
  token_id: string
}
export interface SubDao {
  addr: string
  charter?: string | null
}
export interface GetItemResponse {
  item?: string | null
}
export interface InfoResponse {
  info: ContractVersionInfo
}
export interface InstantiateMsg {
  admin?: string | null
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  dao_uri?: string | null
  description: string
  image_url?: string | null
  initial_items?: InitialItem[] | null
  name: string
  proposal_modules_instantiate_info: ModuleInstantiateInfo[]
  voting_module_instantiate_info: ModuleInstantiateInfo
}
export interface InitialItem {
  key: string
  value: string
}
export type ListItemsResponse = [string, string][]
export type ListSubDaosResponse = SubDao[]
export type MigrateMsg =
  | {
      from_v1: {
        dao_uri?: string | null
      }
    }
  | {
      from_compatible: {}
    }
export type ProposalModulesResponse = ProposalModule[]
export type QueryMsg =
  | {
      admin: {}
    }
  | {
      admin_nomination: {}
    }
  | {
      config: {}
    }
  | {
      cw20_balances: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      cw20_token_list: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      cw721_token_list: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      dump_state: {}
    }
  | {
      get_item: {
        key: string
      }
    }
  | {
      list_items: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      proposal_modules: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      active_proposal_modules: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      pause_info: {}
    }
  | {
      voting_module: {}
    }
  | {
      list_sub_daos: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      dao_u_r_i: {}
    }
  | {
      voting_power_at_height: {
        address: string
        height?: number | null
      }
    }
  | {
      total_power_at_height: {
        height?: number | null
      }
    }
  | {
      info: {}
    }
export interface TotalPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
}
export type VotingModuleResponse = string
export interface VotingPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
}

export type ProposalModuleWithInfo = ProposalModule & {
  info?: ContractVersionInfo
}

export type SubDaoWithChainId = SubDao & {
  chainId: string
}
export type ListAllSubDaosResponse = SubDaoWithChainId[]
