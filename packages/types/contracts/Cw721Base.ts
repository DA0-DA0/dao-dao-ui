import { Binary, Empty, Expiration } from './common'

export interface AllNftInfoResponse {
  access: OwnerOfResponse
  info: NftInfoResponseForNullable_Empty
}
export interface OwnerOfResponse {
  approvals: Approval[]
  owner: string
}
export interface Approval {
  expires: Expiration
  spender: string
}
export interface NftInfoResponseForNullable_Empty {
  extension?: Empty | null
  token_uri?: string | null
}
export interface AllOperatorsResponse {
  operators: Approval[]
}
export interface AllTokensResponse {
  tokens: string[]
}
export interface ApprovalResponse {
  approval: Approval
}
export interface ApprovalsResponse {
  approvals: Approval[]
}
export interface ContractInfoResponse {
  name: string
  symbol: string
}
export type ExecuteMsg =
  | {
      transfer_nft: {
        recipient: string
        token_id: string
      }
    }
  | {
      send_nft: {
        contract: string
        msg: Binary
        token_id: string
      }
    }
  | {
      approve: {
        expires?: Expiration | null
        spender: string
        token_id: string
      }
    }
  | {
      revoke: {
        spender: string
        token_id: string
      }
    }
  | {
      approve_all: {
        expires?: Expiration | null
        operator: string
      }
    }
  | {
      revoke_all: {
        operator: string
      }
    }
  | {
      mint: MintMsgForNullable_Empty
    }
  | {
      burn: {
        token_id: string
      }
    }
export interface MintMsgForNullable_Empty {
  extension?: Empty | null
  owner: string
  token_id: string
  token_uri?: string | null
}
export interface InstantiateMsg {
  minter: string
  name: string
  symbol: string
}
export interface MinterResponse {
  minter: string
}
export interface NftInfoResponse {
  extension?: Empty | null
  token_uri?: string | null
}
export interface NumTokensResponse {
  count: number
}
export type QueryMsg =
  | {
      owner_of: {
        include_expired?: boolean | null
        token_id: string
      }
    }
  | {
      approval: {
        include_expired?: boolean | null
        spender: string
        token_id: string
      }
    }
  | {
      approvals: {
        include_expired?: boolean | null
        token_id: string
      }
    }
  | {
      all_operators: {
        include_expired?: boolean | null
        limit?: number | null
        owner: string
        start_after?: string | null
      }
    }
  | {
      num_tokens: {}
    }
  | {
      contract_info: {}
    }
  | {
      nft_info: {
        token_id: string
      }
    }
  | {
      all_nft_info: {
        include_expired?: boolean | null
        token_id: string
      }
    }
  | {
      tokens: {
        limit?: number | null
        owner: string
        start_after?: string | null
      }
    }
  | {
      all_tokens: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      minter: {}
    }
export interface TokensResponse {
  tokens: string[]
}
