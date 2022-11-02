import { Addr, Binary, Duration, Expiration, Uint128 } from './common'

export interface AllAccountsResponse {
  accounts: string[]
  [k: string]: unknown
}
export interface AllAllowancesResponse {
  allowances: AllowanceInfo[]
  [k: string]: unknown
}
export interface AllowanceInfo {
  allowance: Uint128
  expires: Expiration
  spender: string
  [k: string]: unknown
}
export interface AllowanceResponse {
  allowance: Uint128
  expires: Expiration
  [k: string]: unknown
}
export interface BalanceResponse {
  balance: Uint128
  [k: string]: unknown
}
export interface ClaimsResponse {
  claims: Claim[]
  [k: string]: unknown
}
export interface Claim {
  amount: Uint128
  release_at: Expiration
  [k: string]: unknown
}
export type ExecuteMsg =
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      unstake: {
        amount: Uint128
        [k: string]: unknown
      }
    }
  | {
      claim: {
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
      add_hook: {
        addr: string
        [k: string]: unknown
      }
    }
  | {
      remove_hook: {
        addr: string
        [k: string]: unknown
      }
    }
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
  [k: string]: unknown
}
export interface GetConfigResponse {
  manager?: Addr | null
  owner?: Addr | null
  token_address: Addr
  unstaking_duration?: Duration | null
  [k: string]: unknown
}
export interface GetHooksResponse {
  hooks: string[]
  [k: string]: unknown
}
export interface InstantiateMsg {
  manager?: string | null
  owner?: string | null
  token_address: string
  unstaking_duration?: Duration | null
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
export type QueryMsg =
  | {
      staked_balance_at_height: {
        address: string
        height?: number | null
        [k: string]: unknown
      }
    }
  | {
      total_staked_at_height: {
        height?: number | null
        [k: string]: unknown
      }
    }
  | {
      staked_value: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      total_value: {
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
      get_hooks: {
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
export interface StakedBalanceAtHeightResponse {
  balance: Uint128
  height: number
  [k: string]: unknown
}
export interface StakedValueResponse {
  value: Uint128
  [k: string]: unknown
}
export interface TokenInfoResponse {
  decimals: number
  name: string
  symbol: string
  total_supply: Uint128
  [k: string]: unknown
}
export interface TotalStakedAtHeightResponse {
  height: number
  total: Uint128
  [k: string]: unknown
}
export interface TotalValueResponse {
  total: Uint128
  [k: string]: unknown
}
