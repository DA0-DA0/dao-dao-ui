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

export type ProposalModuleStatus = 'Enabled' | 'Disabled'
export type ActiveProposalModulesResponse = ProposalModule[]
export interface ProposalModule {
  address: Addr
  prefix: string
  status: ProposalModuleStatus
  [k: string]: unknown
}
export interface AdminNominationResponse {
  nomination?: Addr | null
  [k: string]: unknown
}
export type AdminResponse = Addr | null
export interface ConfigResponse {
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  dao_uri?: string | null
  description: string
  image_url?: string | null
  name: string
  [k: string]: unknown
}
export interface Cw20BalanceResponse {
  addr: Addr
  balance: Uint128
  [k: string]: unknown
}
export type Cw20BalancesResponse = Cw20BalanceResponse[]
export type Cw20TokenListResponse = Addr[]
export type Cw721TokenListResponse = Addr[]
export type DaoURIResponse = string | null
export type PauseInfoResponse =
  | {
      Paused: {
        expiration: Expiration
        [k: string]: unknown
      }
    }
  | {
      Unpaused: {
        [k: string]: unknown
      }
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
  [k: string]: unknown
}
export interface Config {
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  dao_uri?: string | null
  description: string
  image_url?: string | null
  name: string
  [k: string]: unknown
}
export type ExecuteMsg =
  | {
      execute_admin_msgs: {
        msgs: CosmosMsgForEmpty[]
        [k: string]: unknown
      }
    }
  | {
      execute_proposal_hook: {
        msgs: CosmosMsgForEmpty[]
        [k: string]: unknown
      }
    }
  | {
      pause: {
        duration: Duration
        [k: string]: unknown
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
        [k: string]: unknown
      }
    }
  | {
      set_item: {
        addr: string
        key: string
        [k: string]: unknown
      }
    }
  | {
      nominate_admin: {
        admin?: string | null
        [k: string]: unknown
      }
    }
  | {
      accept_admin_nomination: {
        [k: string]: unknown
      }
    }
  | {
      withdraw_admin_nomination: {
        [k: string]: unknown
      }
    }
  | {
      update_config: {
        config: Config
        [k: string]: unknown
      }
    }
  | {
      update_cw20_list: {
        to_add: string[]
        to_remove: string[]
        [k: string]: unknown
      }
    }
  | {
      update_cw721_list: {
        to_add: string[]
        to_remove: string[]
        [k: string]: unknown
      }
    }
  | {
      update_proposal_modules: {
        to_add: ModuleInstantiateInfo[]
        to_disable: string[]
        [k: string]: unknown
      }
    }
  | {
      update_voting_module: {
        module: ModuleInstantiateInfo
        [k: string]: unknown
      }
    }
  | {
      update_sub_daos: {
        to_add: SubDao[]
        to_remove: string[]
        [k: string]: unknown
      }
    }
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
  [k: string]: unknown
}
export interface Cw721ReceiveMsg {
  msg: Binary
  sender: string
  token_id: string
  [k: string]: unknown
}
export interface SubDao {
  addr: string
  charter?: string | null
  [k: string]: unknown
}
export interface GetItemResponse {
  item?: string | null
  [k: string]: unknown
}
export interface InfoResponse {
  info: ContractVersionInfo
  [k: string]: unknown
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
  [k: string]: unknown
}
export interface InitialItem {
  key: string
  value: string
  [k: string]: unknown
}
export type ListItemsResponse = string[]
export type ListSubDaosResponse = SubDao[]
export type MigrateMsg =
  | {
      from_v1: {
        dao_uri?: string | null
        [k: string]: unknown
      }
    }
  | {
      from_compatible: {
        [k: string]: unknown
      }
    }
export type ProposalModulesResponse = ProposalModule[]
export type QueryMsg =
  | {
      admin: {
        [k: string]: unknown
      }
    }
  | {
      admin_nomination: {
        [k: string]: unknown
      }
    }
  | {
      config: {
        [k: string]: unknown
      }
    }
  | {
      cw20_balances: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      cw20_token_list: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      cw721_token_list: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      dump_state: {
        [k: string]: unknown
      }
    }
  | {
      get_item: {
        key: string
        [k: string]: unknown
      }
    }
  | {
      list_items: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      proposal_modules: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      active_proposal_modules: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      pause_info: {
        [k: string]: unknown
      }
    }
  | {
      voting_module: {
        [k: string]: unknown
      }
    }
  | {
      list_sub_daos: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      dao_u_r_i: {
        [k: string]: unknown
      }
    }
  | {
      voting_power_at_height: {
        address: string
        height?: number | null
        [k: string]: unknown
      }
    }
  | {
      total_power_at_height: {
        height?: number | null
        [k: string]: unknown
      }
    }
  | {
      info: {
        [k: string]: unknown
      }
    }
export interface TotalPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
  [k: string]: unknown
}
export type VotingModuleResponse = string
export interface VotingPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
  [k: string]: unknown
}

export interface ProposalModuleWithInfo extends ProposalModule {
  info: ContractVersionInfo
}
