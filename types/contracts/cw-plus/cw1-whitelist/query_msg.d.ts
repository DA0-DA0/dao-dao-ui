import { CosmosMsgFor_Empty } from './shared-types'

export type QueryMsg =
  | {
      admin_list: {
        [k: string]: unknown
      }
    }
  | {
      can_execute: {
        msg: CosmosMsgFor_Empty
        sender: string
        [k: string]: unknown
      }
    }
