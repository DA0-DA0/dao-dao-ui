import { GenericToken } from '@dao-dao/types'
import { Vest } from '@dao-dao/types/contracts/CwVesting'

export type VestingValidatorSlash = {
  // The time the slash occurred.
  timeMs: number
  // The amount that got slashed.
  amount: number
  // The amount of the slash that has not been registered with the contract.
  // This should be equal to `amount` if the slash has not been registered and 0
  // otherwise. If it is between 0 and `amount`, then only part of the slash has
  // been registered, and this is the unregistered portion. This should only
  // happen if multiple slashes occurred at the same time and only some of them
  // have been registered (which I do not think is possible) or if someone
  // somehow registered only part of a slash (likely manually or due to a UI
  // bug).
  unregisteredAmount: number
}

export type VestingValidatorWithSlashes = {
  validatorOperatorAddress: string
  slashes: VestingValidatorSlash[]
}

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
  // Slashes on staked or unstaked tokens that have occurred during the vest.
  slashes: VestingValidatorWithSlashes[]
  // Whether or not all has been claimed.
  completed: boolean
  // Dates.
  startDate: Date
  endDate: Date
}
