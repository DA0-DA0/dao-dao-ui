import { Addr, Decimal, Timestamp, Uint128 } from './common'

export interface InstantiateMsg {
  auctions_manager_addr: string
  base_denom_whitelist: string[]
  cycle_start: Timestamp
  denom_whitelist: string[]
  services_manager_addr: string
}
export type ExecuteMsg =
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
        sender: string
      }
    }
  | {
      resume: {
        resume_for: string
        sender: string
      }
    }
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
  denom: string
  bps: number
  min_balance?: Uint128 | null
}
export interface RebalancerUpdateData {
  base_denom?: string | null
  max_limit?: number | null
  pid?: PID | null
  target_override_strategy?: TargetOverrideStrategy | null
  targets: Target[]
  trustee?: OptionalFieldForString | null
}
export type QueryMsg =
  | {
      get_config: {
        addr: string
      }
    }
  | {
      get_system_status: {}
    }
export type SignedDecimal = [Decimal, boolean]
export interface RebalancerConfig {
  base_denom: string
  has_min_balance: boolean
  is_paused?: Addr | null
  last_rebalance: Timestamp
  max_limit: Decimal
  pid: ParsedPID
  target_override_strategy: TargetOverrideStrategy
  targets: ParsedTarget[]
  trustee?: string | null
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
