import { Addr, Expiration } from './common'

export interface InstantiateMsg {
  assigner: string
  owner?: string | null
}
export type ExecuteMsg =
  | {
      assign: {
        address: string
        checkmark_id: string
      }
    }
  | {
      delete: {}
    }
  | {
      revoke_checkmark: {
        checkmark_id: string
      }
    }
  | {
      revoke_address: {
        address: string
      }
    }
  | {
      update_checkmark_ban: {
        ban_ids?: string[] | null
        unban_ids?: string[] | null
      }
    }
  | {
      update_assigner: {
        assigner: string
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
export type QueryMsg =
  | {
      get_checkmark: {
        address: string
      }
    }
  | {
      get_address: {
        checkmark_id: string
      }
    }
  | {
      count: {}
    }
  | {
      checkmark_banned: {
        checkmark_id: string
      }
    }
  | {
      assigner: {}
    }
  | {
      ownership: {}
    }
export interface AssignerResponse {
  assigner: Addr
}
export interface CheckmarkBannedResponse {
  banned: boolean
}
export interface CountResponse {
  count: number
}
export interface GetAddressResponse {
  address?: Addr | null
}
export interface GetCheckmarkResponse {
  checkmark_id?: string | null
}
export interface OwnershipForString {
  owner?: string | null
  pending_expiry?: Expiration | null
  pending_owner?: string | null
}
