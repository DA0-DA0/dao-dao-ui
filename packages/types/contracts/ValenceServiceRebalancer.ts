import { Addr, Coin, Decimal, Expiration, Timestamp, Uint128 } from './common'

export interface InstantiateMsg {
  auctions_manager_addr: string
  base_denom_whitelist: BaseDenom[]
  cycle_period?: number | null
  cycle_start: Timestamp
  denom_whitelist: string[]
  fees: ServiceFeeConfig
  services_manager_addr: string
}
export interface BaseDenom {
  denom: string
  min_balance_limit: Uint128
}
export interface ServiceFeeConfig {
  denom: string
  register_fee: Uint128
  resume_fee: Uint128
}
export type ExecuteMsg =
  | 'approve_admin_change'
  | {
      admin: RebalancerAdminMsg
    }
  | {
      system_rebalance: {
        limit?: number | null
      }
    }
  | {
      register: {
        data?: RebalancerData | null
        register_for: string
      }
    }
  | {
      deregister: {
        deregister_for: string
      }
    }
  | {
      update: {
        data: RebalancerUpdateData
        update_for: string
      }
    }
  | {
      pause: {
        pause_for: string
        reason?: string | null
        sender: string
      }
    }
  | {
      resume: {
        resume_for: string
        sender: string
      }
    }
export type RebalancerAdminMsg =
  | 'cancel_admin_change'
  | {
      update_system_status: {
        status: SystemRebalanceStatus
      }
    }
  | {
      update_denom_whitelist: {
        to_add: string[]
        to_remove: string[]
      }
    }
  | {
      update_base_denom_whitelist: {
        to_add: BaseDenom[]
        to_remove: string[]
      }
    }
  | {
      update_services_manager: {
        addr: string
      }
    }
  | {
      update_auctions_manager: {
        addr: string
      }
    }
  | {
      update_cycle_period: {
        period: number
      }
    }
  | {
      update_fess: {
        fees: ServiceFeeConfig
      }
    }
  | {
      start_admin_change: {
        addr: string
        expiration: Expiration
      }
    }
export type SystemRebalanceStatus =
  | {
      not_started: {
        cycle_start: Timestamp
      }
    }
  | {
      processing: {
        cycle_started: Timestamp
        prices: [Pair, Decimal][]
        start_from: Addr
      }
    }
  | {
      finished: {
        next_cycle: Timestamp
      }
    }
export type Pair = [string, string]
export type TargetOverrideStrategy = 'proportional' | 'priority'
export type OptionalFieldForString =
  | 'clear'
  | {
      set: string
    }
export interface RebalancerData {
  base_denom: string
  max_limit_bps?: number | null
  pid: PID
  target_override_strategy: TargetOverrideStrategy
  targets: Target[]
  trustee?: string | null
}
export interface PID {
  d: string
  i: string
  p: string
}
export interface Target {
  bps: number
  denom: string
  min_balance?: Uint128 | null
}
export interface RebalancerUpdateData {
  base_denom?: string | null
  max_limit_bps?: number | null
  pid?: PID | null
  target_override_strategy?: TargetOverrideStrategy | null
  targets: Target[]
  trustee?: OptionalFieldForString | null
}
export type QueryMsg =
  | ('get_white_lists' | 'get_managers_addrs' | 'get_admin')
  | {
      get_config: {
        addr: string
      }
    }
  | {
      get_paused_config: {
        addr: string
      }
    }
  | {
      get_system_status: {}
    }
  | {
      get_service_fee: {
        account: string
        action: QueryFeeAction
      }
    }
export type QueryFeeAction = 'register' | 'resume'
export type SignedDecimal = [Decimal, boolean]
export interface RebalancerConfig {
  base_denom: string
  has_min_balance: boolean
  last_rebalance: Timestamp
  max_limit: Decimal
  pid: ParsedPID
  target_override_strategy: TargetOverrideStrategy
  targets: ParsedTarget[]
  trustee?: Addr | null
}
export interface ParsedPID {
  d: Decimal
  i: Decimal
  p: Decimal
}
export interface ParsedTarget {
  denom: string
  last_i: SignedDecimal
  last_input?: Decimal | null
  min_balance?: Uint128 | null
  percentage: Decimal
}
export interface ManagersAddrsResponse {
  auctions: Addr
  services: Addr
}
export type PauseReason =
  | 'empty_balance'
  | {
      account_reason: string
    }
export interface PauseData {
  config: RebalancerConfig
  pauser: Addr
  reason: PauseReason
}
export type NullableCoin = Coin | null
export interface WhitelistsResponse {
  base_denom_whitelist: BaseDenom[]
  denom_whitelist: string[]
}
