import { Expiration, Uint128 } from './shared-types'

export type ExecuteMsg =
  | {
      bond: {
        [k: string]: unknown
      }
    }
  | {
      unbond: {
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
      reinvest: {
        [k: string]: unknown
      }
    }
  | {
      __bond_all_tokens: {
        [k: string]: unknown
      }
    }
  | {
      transfer: {
        amount: Uint128
        recipient: string
        [k: string]: unknown
      }
    }
  | {
      burn: {
        amount: Uint128
        [k: string]: unknown
      }
    }
  | {
      send: {
        amount: Uint128
        contract: string
        msg: Binary
        [k: string]: unknown
      }
    }
  | {
      increase_allowance: {
        amount: Uint128
        expires?: Expiration | null
        spender: string
        [k: string]: unknown
      }
    }
  | {
      decrease_allowance: {
        amount: Uint128
        expires?: Expiration | null
        spender: string
        [k: string]: unknown
      }
    }
  | {
      transfer_from: {
        amount: Uint128
        owner: string
        recipient: string
        [k: string]: unknown
      }
    }
  | {
      send_from: {
        amount: Uint128
        contract: string
        msg: Binary
        owner: string
        [k: string]: unknown
      }
    }
  | {
      burn_from: {
        amount: Uint128
        owner: string
        [k: string]: unknown
      }
    }
/**
 * Binary is a wrapper around Vec<u8> to add base64 de/serialization with serde. It also adds some helper methods to help encode inline.
 *
 * This is only needed as serde-json-{core,wasm} has a horrible encoding for Vec<u8>
 */
export type Binary = string
