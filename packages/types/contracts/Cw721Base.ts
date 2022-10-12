import { Binary, Empty, Expiration } from './common'

export interface AllNftInfoResponse {
  access: OwnerOfResponse
  info: NftInfoResponseForNullable_Empty
  [k: string]: unknown
}
export interface OwnerOfResponse {
  approvals: Approval[]
  owner: string
  [k: string]: unknown
}
export interface Approval {
  expires: Expiration
  spender: string
  [k: string]: unknown
}
export interface NftInfoResponseForNullable_Empty {
  extension?: Empty | null
  token_uri?: string | null
  [k: string]: unknown
}
export interface AllOperatorsResponse {
  operators: Approval[]
  [k: string]: unknown
}
export interface AllTokensResponse {
  tokens: string[]
  [k: string]: unknown
}
export interface ApprovalResponse {
  approval: Approval
  [k: string]: unknown
}
export interface ApprovalsResponse {
  approvals: Approval[]
  [k: string]: unknown
}
export interface ContractInfoResponse {
  name: string
  symbol: string
  [k: string]: unknown
}
export type ExecuteMsg =
  | {
      transfer_nft: {
        recipient: string
        token_id: string
        [k: string]: unknown
      }
    }
  | {
      send_nft: {
        contract: string
        msg: Binary
        token_id: string
        [k: string]: unknown
      }
    }
  | {
      approve: {
        expires?: Expiration | null
        spender: string
        token_id: string
        [k: string]: unknown
      }
    }
  | {
      revoke: {
        spender: string
        token_id: string
        [k: string]: unknown
      }
    }
  | {
      approve_all: {
        expires?: Expiration | null
        operator: string
        [k: string]: unknown
      }
    }
  | {
      revoke_all: {
        operator: string
        [k: string]: unknown
      }
    }
  | {
      mint: MintMsgForNullable_Empty
    }
  | {
      burn: {
        token_id: string
        [k: string]: unknown
      }
    }
export interface MintMsgForNullable_Empty {
  extension?: Empty | null
  owner: string
  token_id: string
  token_uri?: string | null
  [k: string]: unknown
}
export interface InstantiateMsg {
  minter: string
  name: string
  symbol: string
  [k: string]: unknown
}
export interface MinterResponse {
  minter: string
  [k: string]: unknown
}
export interface NftInfoResponse {
  extension?: Empty | null
  token_uri?: string | null
  [k: string]: unknown
}
export interface NumTokensResponse {
  count: number
  [k: string]: unknown
}
export type QueryMsg =
  | {
      owner_of: {
        include_expired?: boolean | null
        token_id: string
        [k: string]: unknown
      }
    }
  | {
      approval: {
        include_expired?: boolean | null
        spender: string
        token_id: string
        [k: string]: unknown
      }
    }
  | {
      approvals: {
        include_expired?: boolean | null
        token_id: string
        [k: string]: unknown
      }
    }
  | {
      all_operators: {
        include_expired?: boolean | null
        limit?: number | null
        owner: string
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      num_tokens: {
        [k: string]: unknown
      }
    }
  | {
      contract_info: {
        [k: string]: unknown
      }
    }
  | {
      nft_info: {
        token_id: string
        [k: string]: unknown
      }
    }
  | {
      all_nft_info: {
        include_expired?: boolean | null
        token_id: string
        [k: string]: unknown
      }
    }
  | {
      tokens: {
        limit?: number | null
        owner: string
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      all_tokens: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      minter: {
        [k: string]: unknown
      }
    }
export interface TokensResponse {
  tokens: string[]
  [k: string]: unknown
}
