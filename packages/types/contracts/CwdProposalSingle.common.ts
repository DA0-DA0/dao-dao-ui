import { Addr, Decimal, Uint128 } from './common'

export enum Vote {
  Yes = 'yes',
  No = 'no',
  Abstain = 'abstain',
}

export enum Status {
  Open = 'open',
  Rejected = 'rejected',
  Passed = 'passed',
  Executed = 'executed',
  ExecutionFailed = 'execution_failed',
  Closed = 'closed',
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
}
