import { CosmosMsgFor_Empty } from './shared-types'

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
