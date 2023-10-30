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
}
export type Cw20BalancesResponse = Cw20BalanceResponse[]
export interface Cw20BalanceResponse {
  addr: Addr
  balance: Uint128
}
export type Cw20TokenListResponse = Addr[]
export type Cw721TokenListResponse = Addr[]
export type PauseInfoResponse =
  | {
      Paused: {
        expiration: Expiration
      }
    }
  | {
      Unpaused: {}
    }
export interface DumpStateResponse {
  admin?: Addr | null
  config: Config
  pause_info: PauseInfoResponse
  proposal_modules: Addr[]
  version: ContractVersionInfo
  voting_module: Addr
}
export interface Config {
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  description: string
  image_url?: string | null
  name: string
}
export interface GetItemResponse {
  item?: Addr | null
}
export type GovernanceModulesResponse = Addr[]
export interface InfoResponse {
  info: ContractVersionInfo
}
export type InitialItemInfo =
  | {
      Existing: {
        address: string
      }
    }
  | {
      Instantiate: {
        info: ModuleInstantiateInfo
      }
    }
export type Admin =
  | {
      address: {
        addr: string
      }
    }
  | {
      core_contract: {}
    }
  | {
      none: {}
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
}
export interface InitialItem {
  info: InitialItemInfo
  name: string
}
export interface ModuleInstantiateInfo {
  admin: Admin
  code_id: number
  label: string
  msg: Binary
}
export type ListItemsResponse = string[]
export type ProposalModulesResponse = Addr[]
export interface TotalPowerAtHeightResponse {
  height: number
  power: Uint128
}
export type VotingModuleResponse = string
export interface VotingPowerAtHeightResponse {
  height: number
  power: Uint128
}
