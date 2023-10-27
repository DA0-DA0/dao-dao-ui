import { Addr, Coin, Expiration, Uint128 } from './common'

export type InstantiateMsg =
  | {
      new_token: {
        subdenom: string
      }
    }
  | {
      existing_token: {
        denom: string
      }
    }
export type ExecuteMsg =
  | {
      allow: {
        address: string
        status: boolean
      }
    }
  | {
      burn: {
        amount: Uint128
        from_address: string
      }
    }
  | {
      mint: {
        amount: Uint128
        to_address: string
      }
    }
  | {
      deny: {
        address: string
        status: boolean
      }
    }
  | {
      freeze: {
        status: boolean
      }
    }
  | {
      force_transfer: {
        amount: Uint128
        from_address: string
        to_address: string
      }
    }
  | {
      set_before_send_hook: {
        cosmwasm_address: string
      }
    }
  | {
      set_burner_allowance: {
        address: string
        allowance: Uint128
      }
    }
  | {
      set_denom_metadata: {
        metadata: Metadata
      }
    }
  | {
      set_minter_allowance: {
        address: string
        allowance: Uint128
      }
    }
  | {
      update_token_factory_admin: {
        new_admin: string
      }
    }
  | {
      update_ownership: Action
    }
export type Action =
  | {
      transfer_ownership: {
        expiry?: Expiration | null
        new_owner: string
      }
    }
  | 'accept_ownership'
  | 'renounce_ownership'
export interface Metadata {
  base: string
  denom_units: DenomUnit[]
  description: string
  display: string
  name: string
  symbol: string
}
export interface DenomUnit {
  aliases: string[]
  denom: string
  // Serialized as string for some reason.
  exponent: string
}
export type QueryMsg =
  | {
      is_frozen: {}
    }
  | {
      denom: {}
    }
  | {
      ownership: {}
    }
  | {
      burn_allowance: {
        address: string
      }
    }
  | {
      burn_allowances: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      mint_allowance: {
        address: string
      }
    }
  | {
      mint_allowances: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      is_denied: {
        address: string
      }
    }
  | {
      denylist: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      is_allowed: {
        address: string
      }
    }
  | {
      allowlist: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      before_send_hook_info: {}
    }
export type SudoMsg = {
  block_before_send: {
    amount: Coin
    from: string
    to: string
  }
}
export interface AllowlistResponse {
  allowlist: StatusInfo[]
}
export interface StatusInfo {
  address: string
  status: boolean
}
export interface BeforeSendHookInfo {
  advanced_features_enabled: boolean
  hook_contract_address?: string | null
}
export interface AllowanceResponse {
  allowance: Uint128
}
export interface AllowancesResponse {
  allowances: AllowanceInfo[]
}
export interface AllowanceInfo {
  address: string
  allowance: Uint128
}
export interface DenomResponse {
  denom: string
}
export interface DenylistResponse {
  denylist: StatusInfo[]
}
export interface StatusResponse {
  status: boolean
}
export interface IsFrozenResponse {
  is_frozen: boolean
}
export interface OwnershipForAddr {
  owner?: Addr | null
  pending_expiry?: Expiration | null
  pending_owner?: Addr | null
}
