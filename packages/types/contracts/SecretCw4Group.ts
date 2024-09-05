/**
 * This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export interface InstantiateMsg {
  admin?: string | null
  members: Member[]
  query_auth: RawContract
}
export interface Member {
  addr: string
  weight: number
}
export interface RawContract {
  address: string
  code_hash: string
}
export type ExecuteMsg =
  | {
      update_admin: {
        admin?: string | null
      }
    }
  | {
      update_members: {
        add: Member[]
        remove: string[]
      }
    }
  | {
      add_hook: {
        hook: HookItem
      }
    }
  | {
      remove_hook: {
        hook: HookItem
      }
    }
export type Addr = string
export interface HookItem {
  addr: Addr
  code_hash: string
}
export type QueryMsg =
  | {
      admin: {}
    }
  | {
      total_weight: {
        at_height?: number | null
      }
    }
  | {
      list_members: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      member: {
        at_height?: number | null
        auth: Auth
      }
    }
  | {
      hooks: {}
    }
export type Auth =
  | {
      viewing_key: {
        address: string
        key: string
      }
    }
  | {
      permit: PermitForPermitData
    }
export type Uint128 = string
export type Binary = string
export interface PermitForPermitData {
  account_number?: Uint128 | null
  chain_id?: string | null
  memo?: string | null
  params: PermitData
  sequence?: Uint128 | null
  signature: PermitSignature
}
export interface PermitData {
  data: Binary
  key: string
}
export interface PermitSignature {
  pub_key: PubKey
  signature: Binary
}
export interface PubKey {
  type: string
  value: Binary
}
export interface AdminResponse {
  admin?: string | null
}
export interface HooksResponse {
  hooks: HookItem[]
}
export interface MemberListResponse {
  members: Member[]
}
export interface MemberResponse {
  weight?: number | null
}
export interface TotalWeightResponse {
  weight: number
}
