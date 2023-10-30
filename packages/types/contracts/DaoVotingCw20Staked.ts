import {
  ActiveThreshold,
  Binary,
  ContractVersionInfo,
  Duration,
  Uint128,
} from './common'

export interface ActiveThresholdResponse {
  active_threshold?: ActiveThreshold | null
}
export type DaoResponse = string
export type ExecuteMsg = {
  update_active_threshold: {
    new_threshold?: ActiveThreshold | null
  }
}
export interface InfoResponse {
  info: ContractVersionInfo
}
export type TokenInfo =
  | {
      existing: {
        address: string
        staking_contract: StakingInfo
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
      }
    }
export type StakingInfo =
  | {
      existing: {
        staking_contract_address: string
      }
    }
  | {
      new: {
        staking_code_id: number
        unstaking_duration?: Duration | null
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
}
export interface Cw20Coin {
  address: string
  amount: Uint128
}
export interface InstantiateMarketingInfo {
  description?: string | null
  logo?: Logo | null
  marketing?: string | null
  project?: string | null
}
export interface IsActiveResponse {
  active: boolean
}
export interface MigrateMsg {}
export type QueryMsg =
  | {
      staking_contract: {}
    }
  | {
      dao: {}
    }
  | {
      active_threshold: {}
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
  | {
      token_contract: {}
    }
  | {
      is_active: {}
    }
export type StakingContractResponse = string
export type TokenContractResponse = string
export interface TotalPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
}
export interface VotingPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
}
