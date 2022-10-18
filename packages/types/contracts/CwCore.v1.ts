import {
  Addr,
  Binary,
  ContractVersionInfo,
  Expiration,
  Uint128,
} from './common'

export type AdminResponse = Addr | null
export interface ConfigResponse {
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  description: string
  image_url?: string | null
  name: string
  [k: string]: unknown
}
export type Cw20BalancesResponse = Cw20BalanceResponse[]
export interface Cw20BalanceResponse {
  addr: Addr
  balance: Uint128
  [k: string]: unknown
}
export type Cw20TokenListResponse = Addr[]
export type Cw721TokenListResponse = Addr[]
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
  admin?: Addr | null
  config: Config
  pause_info: PauseInfoResponse
  proposal_modules: Addr[]
  version: ContractVersionInfo
  voting_module: Addr
  [k: string]: unknown
}
export interface Config {
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  description: string
  image_url?: string | null
  name: string
  [k: string]: unknown
}
export interface GetItemResponse {
  item?: Addr | null
  [k: string]: unknown
}
export type GovernanceModulesResponse = Addr[]
export interface InfoResponse {
  info: ContractVersionInfo
  [k: string]: unknown
}
export type InitialItemInfo =
  | {
      Existing: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      Instantiate: {
        info: ModuleInstantiateInfo
        [k: string]: unknown
      }
    }
export type Admin =
  | {
      address: {
        addr: string
        [k: string]: unknown
      }
    }
  | {
      core_contract: {
        [k: string]: unknown
      }
    }
  | {
      none: {
        [k: string]: unknown
      }
    }
export interface InstantiateMsg {
  admin?: string | null
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  description: string
  image_url?: string | null
  initial_items?: InitialItem[] | null
  name: string
  proposal_modules_instantiate_info: ModuleInstantiateInfo[]
  voting_module_instantiate_info: ModuleInstantiateInfo
  [k: string]: unknown
}
export interface InitialItem {
  info: InitialItemInfo
  name: string
  [k: string]: unknown
}
export interface ModuleInstantiateInfo {
  admin: Admin
  code_id: number
  label: string
  msg: Binary
  [k: string]: unknown
}
export type ListItemsResponse = string[]
export type ProposalModulesResponse = Addr[]
export interface TotalPowerAtHeightResponse {
  height: number
  power: Uint128
  [k: string]: unknown
}
export type VotingModuleResponse = string
export interface VotingPowerAtHeightResponse {
  height: number
  power: Uint128
  [k: string]: unknown
}
