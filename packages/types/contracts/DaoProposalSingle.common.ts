import { Addr, Decimal, Uint128 } from './common'

export enum Vote {
  Yes = 'yes',
  No = 'no',
  Abstain = 'abstain',
}

export type Threshold =
  | {
      absolute_percentage: {
        percentage: PercentageThreshold
      }
    }
  | {
      threshold_quorum: {
        quorum: PercentageThreshold
        threshold: PercentageThreshold
      }
    }
  | {
      absolute_count: {
        threshold: Uint128
      }
    }

export type PercentageThreshold =
  | {
      majority: {}
    }
  | {
      percent: Decimal
    }

export interface Votes {
  abstain: Uint128
  no: Uint128
  yes: Uint128
}

export interface VoteInfo {
  power: Uint128
  vote: Vote
  voter: Addr
  rationale?: string | null
  votedAt?: string
}

export interface ListVotesResponse {
  votes: VoteInfo[]
}

export interface VoteResponse {
  vote?: VoteInfo | null
}
