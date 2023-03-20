import { Addr, Binary, Duration, Expiration, Uint128 } from './common'

export interface AllAccountsResponse {
  accounts: string[]
}
export interface AllAllowancesResponse {
  allowances: AllowanceInfo[]
}
export interface AllowanceInfo {
  allowance: Uint128
  expires: Expiration
  spender: string
}
export interface AllowanceResponse {
  allowance: Uint128
  expires: Expiration
}
export interface BalanceResponse {
  balance: Uint128
}
export interface ClaimsResponse {
  claims: Claim[]
}
export interface Claim {
  amount: Uint128
  release_at: Expiration
}
export type ExecuteMsg =
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      unstake: {
        amount: Uint128
      }
    }
  | {
      claim: {}
    }
  | {
      update_config: {
        duration?: Duration | null
        manager?: string | null
        owner?: string | null
      }
    }
  | {
      add_hook: {
        addr: string
      }
    }
  | {
      remove_hook: {
        addr: string
      }
    }
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
}
export interface GetConfigResponse {
  manager?: Addr | null
  owner?: Addr | null
  token_address: Addr
  unstaking_duration?: Duration | null
}
export interface GetHooksResponse {
  hooks: string[]
}
export interface InstantiateMsg {
  manager?: string | null
  owner?: string | null
  token_address: string
  unstaking_duration?: Duration | null
}
export interface ListStakersResponse {
  stakers: StakerBalanceResponse[]
}
export interface StakerBalanceResponse {
  address: string
  balance: Uint128
}
export type QueryMsg =
  | {
      staked_balance_at_height: {
        address: string
        height?: number | null
      }
    }
  | {
      total_staked_at_height: {
        height?: number | null
      }
    }
  | {
      staked_value: {
        address: string
      }
    }
  | {
      total_value: {}
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
      get_hooks: {}
    }
  | {
      list_stakers: {
        limit?: number | null
        start_after?: string | null
      }
    }
export interface StakedBalanceAtHeightResponse {
  balance: Uint128
  // Optional because the indexer does not provide this.
  height?: number
}
export interface StakedValueResponse {
  value: Uint128
}
export interface TokenInfoResponse {
  decimals: number
  name: string
  symbol: string
  total_supply: Uint128
}
export interface TotalStakedAtHeightResponse {
  // Optional because the indexer does not provide this.
  height?: number
  total: Uint128
}
export interface TotalValueResponse {
  total: Uint128
}
