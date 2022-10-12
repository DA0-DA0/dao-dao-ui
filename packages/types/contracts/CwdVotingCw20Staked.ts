import {
  Binary,
  ContractVersionInfo,
  Decimal,
  Duration,
  Uint128,
} from './common'

export type ActiveThreshold =
  | {
      absolute_count: {
        count: Uint128
        [k: string]: unknown
      }
    }
  | {
      percentage: {
        percent: Decimal
        [k: string]: unknown
      }
    }
export interface ActiveThresholdResponse {
  active_threshold?: ActiveThreshold | null
  [k: string]: unknown
}
export type DaoResponse = string
export type ExecuteMsg = {
  update_active_threshold: {
    new_threshold?: ActiveThreshold | null
    [k: string]: unknown
  }
}
export interface InfoResponse {
  info: ContractVersionInfo
  [k: string]: unknown
}
export type TokenInfo =
  | {
      existing: {
        address: string
        staking_contract: StakingInfo
        [k: string]: unknown
      }
    }
  | {
      new: {
        code_id: number
        decimals: number
        initial_balances: Cw20Coin[]
        initial_dao_balance?: Uint128 | null
        label: string
        marketing?: InstantiateMarketingInfo | null
        name: string
        staking_code_id: number
        symbol: string
        unstaking_duration?: Duration | null
        [k: string]: unknown
      }
    }
export type StakingInfo =
  | {
      existing: {
        staking_contract_address: string
        [k: string]: unknown
      }
    }
  | {
      new: {
        staking_code_id: number
        unstaking_duration?: Duration | null
        [k: string]: unknown
      }
    }
export type Logo =
  | {
      url: string
    }
  | {
      embedded: EmbeddedLogo
    }
export type EmbeddedLogo =
  | {
      svg: Binary
    }
  | {
      png: Binary
    }
export interface InstantiateMsg {
  active_threshold?: ActiveThreshold | null
  token_info: TokenInfo
  [k: string]: unknown
}
export interface Cw20Coin {
  address: string
  amount: Uint128
  [k: string]: unknown
}
export interface InstantiateMarketingInfo {
  description?: string | null
  logo?: Logo | null
  marketing?: string | null
  project?: string | null
  [k: string]: unknown
}
export interface IsActiveResponse {
  active: boolean
  [k: string]: unknown
}
export interface MigrateMsg {
  [k: string]: unknown
}
export type QueryMsg =
  | {
      staking_contract: {
        [k: string]: unknown
      }
    }
  | {
      dao: {
        [k: string]: unknown
      }
    }
  | {
      active_threshold: {
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
  | {
      token_contract: {
        [k: string]: unknown
      }
    }
  | {
      is_active: {
        [k: string]: unknown
      }
    }
export type StakingContractResponse = string
export type TokenContractResponse = string
export interface TotalPowerAtHeightResponse {
  height: number
  power: Uint128
  [k: string]: unknown
}
export interface VotingPowerAtHeightResponse {
  height: number
  power: Uint128
  [k: string]: unknown
}
