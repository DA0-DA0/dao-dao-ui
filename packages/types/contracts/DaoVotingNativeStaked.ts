import {
  Addr,
  ContractVersionInfo,
  Duration,
  Expiration,
  Uint128,
} from './common'

export interface ClaimsResponse {
  claims: Claim[]
}
export interface Claim {
  amount: Uint128
  release_at: Expiration
}
export type DaoResponse = string
export type ExecuteMsg =
  | {
      stake: {}
    }
  | {
      unstake: {
        amount: Uint128
      }
    }
  | {
      update_config: {
        duration?: Duration | null
        manager?: string | null
        owner?: string | null
      }
    }
  | {
      claim: {}
    }
export interface GetConfigResponse {
  denom: string
  manager?: Addr | null
  owner?: Addr | null
  unstaking_duration?: Duration | null
}
export interface InfoResponse {
  info: ContractVersionInfo
}
export type Admin =
  | {
      address: {
        addr: string
      }
    }
  | {
      core_module: {}
    }
export interface InstantiateMsg {
  denom: string
  manager?: string | null
  owner?: Admin | null
  unstaking_duration?: Duration | null
}
export interface IsActiveResponse {
  active: boolean
}
export interface ListStakersResponse {
  stakers: StakerBalanceResponse[]
}
export interface StakerBalanceResponse {
  address: string
  balance: Uint128
}
export interface MigrateMsg {}
export type QueryMsg =
  | {
      dao: {}
    }
  | {
      get_config: {}
    }
  | {
      claims: {
        address: string
      }
    }
  | {
      list_stakers: {
        limit?: number | null
        start_after?: string | null
      }
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
export interface VotingPowerAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  power: Uint128
}
