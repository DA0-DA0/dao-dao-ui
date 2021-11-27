import { CosmosMsgFor_Empty, Expiration, Vote } from './shared-types'

export type ExecuteMsg =
  | {
      propose: {
        description: string
        earliest?: Expiration | null
        latest?: Expiration | null
        msgs: CosmosMsgFor_Empty[]
        title: string
        [k: string]: unknown
      }
    }
  | {
      vote: {
        proposal_id: number
        vote: Vote
        [k: string]: unknown
      }
    }
  | {
      execute: {
        proposal_id: number
        [k: string]: unknown
      }
    }
  | {
      close: {
        proposal_id: number
        [k: string]: unknown
      }
    }
