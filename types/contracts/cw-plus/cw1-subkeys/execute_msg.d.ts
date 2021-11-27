import { Coin, CosmosMsgFor_Empty, Expiration } from './shared-types'

export type ExecuteMsg =
  | {
      execute: {
        msgs: CosmosMsgFor_Empty[]
        [k: string]: unknown
      }
    }
  | {
      freeze: {
        [k: string]: unknown
      }
    }
  | {
      update_admins: {
        admins: string[]
        [k: string]: unknown
      }
    }
  | {
      increase_allowance: {
        amount: Coin
        expires?: Expiration | null
        spender: string
        [k: string]: unknown
      }
    }
  | {
      decrease_allowance: {
        amount: Coin
        expires?: Expiration | null
        spender: string
        [k: string]: unknown
      }
    }
  | {
      set_permissions: {
        permissions: Permissions
        spender: string
        [k: string]: unknown
      }
    }

export interface Permissions {
  delegate: boolean
  redelegate: boolean
  undelegate: boolean
  withdraw: boolean
  [k: string]: unknown
}
