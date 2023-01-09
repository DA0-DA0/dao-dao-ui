import {
  Addr,
  ContractVersionInfo,
  Duration,
  Expiration,
  Uint128,
} from './common'

export interface ClaimsResponse {
  claims: Claim[]
  [k: string]: unknown
}
export interface Claim {
  amount: Uint128
  release_at: Expiration
  [k: string]: unknown
}
export type DaoResponse = string
export type ExecuteMsg =
  | {
      stake: {
        [k: string]: unknown
      }
    }
  | {
      unstake: {
        amount: Uint128
        [k: string]: unknown
      }
    }
  | {
      update_config: {
        duration?: Duration | null
        manager?: string | null
        owner?: string | null
        [k: string]: unknown
      }
    }
  | {
      claim: {
        [k: string]: unknown
      }
    }
export interface GetConfigResponse {
  denom: string
  manager?: Addr | null
  owner?: Addr | null
  unstaking_duration?: Duration | null
  [k: string]: unknown
}
export interface InfoResponse {
  info: ContractVersionInfo
  [k: string]: unknown
}
export type Admin =
  | {
      address: {
        addr: string
        [k: string]: unknown
      }
    }
  | {
      core_module: {
        [k: string]: unknown
      }
    }
export interface InstantiateMsg {
  denom: string
  manager?: string | null
  owner?: Admin | null
  unstaking_duration?: Duration | null
  [k: string]: unknown
}
export interface IsActiveResponse {
  active: boolean
  [k: string]: unknown
}
export interface ListStakersResponse {
  stakers: StakerBalanceResponse[]
  [k: string]: unknown
}
export interface StakerBalanceResponse {
  address: string
  balance: Uint128
  [k: string]: unknown
}
export interface MigrateMsg {
  [k: string]: unknown
}
export type QueryMsg =
  | {
      dao: {
        [k: string]: unknown
      }
    }
  | {
      get_config: {
        [k: string]: unknown
      }
    }
  | {
      claims: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      list_stakers: {
        limit?: number | null
        start_after?: string | null
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
export interface VotingPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
  [k: string]: unknown
}
