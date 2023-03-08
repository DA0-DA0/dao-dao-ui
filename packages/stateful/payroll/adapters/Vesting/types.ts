import { GenericToken } from '@dao-dao/types'
import { Vest } from '@dao-dao/types/contracts/CwVesting'

export type VestingInfo = {
  vestingContractAddress: string
  vest: Vest
  token: GenericToken
  owner: string | undefined
  // Amount vested so far.
  vested: string
  // Amount available to distribute.
  distributable: string
  // Total amount being vested.
  total: string
  // The stakable balance. This is the unstaked amount still in the vesting
  // contract. It may be vested or not, but it is definitely not claimed nor
  // staked.
  stakable: string
  // Total staked with all validators.
  staked: string
  // Whether or not all has been claimed.
  completed: boolean
  // Dates.
  startDate: Date
  endDate: Date
}
