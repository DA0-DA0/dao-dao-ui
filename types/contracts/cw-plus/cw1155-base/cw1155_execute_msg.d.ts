import { Binary, Expiration, Uint128 } from './shared-types'

export type Cw1155ExecuteMsg =
  | {
      send_from: {
        from: string
        /**
         * `None` means don't call the receiver interface
         */
        msg?: Binary | null
        /**
         * If `to` is not contract, `msg` should be `None`
         */
        to: string
        token_id: string
        value: Uint128
        [k: string]: unknown
      }
    }
  | {
      batch_send_from: {
        batch: [string, Uint128][]
        from: string
        /**
         * `None` means don't call the receiver interface
         */
        msg?: Binary | null
        /**
         * if `to` is not contract, `msg` should be `None`
         */
        to: string
        [k: string]: unknown
      }
    }
  | {
      mint: {
        /**
         * `None` means don't call the receiver interface
         */
        msg?: Binary | null
        /**
         * If `to` is not contract, `msg` should be `None`
         */
        to: string
        token_id: string
        value: Uint128
        [k: string]: unknown
      }
    }
  | {
      batch_mint: {
        batch: [string, Uint128][]
        /**
         * `None` means don't call the receiver interface
         */
        msg?: Binary | null
        /**
         * If `to` is not contract, `msg` should be `None`
         */
        to: string
        [k: string]: unknown
      }
    }
  | {
      burn: {
        from: string
        token_id: string
        value: Uint128
        [k: string]: unknown
      }
    }
  | {
      batch_burn: {
        batch: [string, Uint128][]
        from: string
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
