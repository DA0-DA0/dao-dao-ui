/**
 * Duration is a delta of time. You can add it to a BlockInfo or Expiration to move that further in the future. Note that an height-based Duration and a time-based Expiration cannot be combined
 */
export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }

export interface InstantiateMsg {
  max_voting_period: Duration
  required_weight: number
  voters: Voter[]
  [k: string]: unknown
}
export interface Voter {
  addr: string
  weight: number
  [k: string]: unknown
}
