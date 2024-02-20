import { GenericToken } from '@dao-dao/types'
import { Vest } from '@dao-dao/types/contracts/CwVesting'

export enum VestingContractVersion {
  /**
   * Version 1 supports vesting payment owner different from factory owner.
   */
  V1 = 1,
  /**
   * Version 2 fixes a bug that prevented vesting NTRN on Neutron.
   */
  V2 = 2,
}

/**
 * The latest version of the vesting contract used by the vesting payments
 * widget.
 */
export const LATEST_VESTING_CONTRACT_VERSION = VestingContractVersion.V2

export type VestingPaymentsWidgetData = {
  /**
   * A map of chain ID to current factory on that chain. This replaces the
   * single `factory` and allows for multiple chains. Old versions should be
   * added to the `oldFactories` list.
   */
  factories?: Record<
    string,
    {
      address: string
      version: VestingContractVersion
    }
  >
  /**
   * Pre-interchain vesting used this field as the only factory. The factories
   * array above is now used instead and takes precedence. This factory, if
   * defined, is on the same chain as the DAO.
   */
  factory?: string
  /**
   * Versioning was created after the widget was created, so it may be
   * undefined. If undefined, assume it supports none of the versioned features.
   * This is part of the old single factory, before the factories map which
   * allows for multiple chains.
   */
  version?: VestingContractVersion
  /**
   * In case the vesting factory is updated, keep a list of the old factories so
   * we still show their vesting payments.
   */
  oldFactories?: OldVestingPaymentFactory[]
}

export type OldVestingPaymentFactory = {
  /**
   * Chain ID was added later. If undefined, assume it is the same as the DAO.
   */
  chainId?: string
  address: string
  /**
   * Versioning was created after the widget was created, so it may be
   * undefined. If undefined, assume it supports none of the versioned features.
   */
  version?: VestingContractVersion
}

export type VestingValidatorSlash = {
  // The time the slash occurred.
  timeMs: number
  // The amount that got slashed.
  amount: number
  // The amount of the slash that has not been registered with the contract.
  // This should be equal to `amount` if the slash has not been registered and 0
  // otherwise. If between 0 and the slash amount, then only part of the slash
  // has been registered, and this is the unregistered portion. This should only
  // happen if multiple slashes occurred at the same time and only some of them
  // have been registered (which I do not think is possible) or if someone
  // somehow registered only part of a slash (likely manually or due to a UI
  // bug).
  unregisteredAmount: number
  // Whether or not this slash was of tokens currently unbonding.
  duringUnbonding: boolean
}

export type VestingValidatorWithSlashes = {
  validatorOperatorAddress: string
  slashes: VestingValidatorSlash[]
}

export type VestingInfo = {
  chainId: string
  vestingContractAddress: string
  vest: Vest
  token: GenericToken
  owner:
    | ({
        address: string
      } & (
        | {
            // Whether or not the owner is a cw1-whitelist contract.
            isCw1Whitelist: true
            // The list of admins whitelisted by the contract.
            cw1WhitelistAdmins: string[]
          }
        | {
            isCw1Whitelist: false
            cw1WhitelistAdmins?: undefined
          }
      ))
    | undefined
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
  // Whether or not all slashes have been registered.
  hasUnregisteredSlashes: boolean
  // Whether or not all has been claimed.
  completed: boolean
  // Dates.
  startDate: Date
  endDate: Date
  // Steps.
  steps: VestingStep[]
}

export type VestingStep = {
  timestamp: number
  // Total amount vested at this timestamp.
  amount: number
}
