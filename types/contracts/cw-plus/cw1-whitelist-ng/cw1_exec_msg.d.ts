import { CosmosMsgFor_Empty } from './shared-types'

export type Cw1ExecMsg = {
  execute: {
    msgs: CosmosMsgFor_Empty[]
    [k: string]: unknown
  }
}
