import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { VestingInfo } from './types'

export const getWithdrawableAmount = ({
  vestingPayment,
  vestedAmount,
  token,
}: VestingInfo): number =>
  convertMicroDenomToDenomWithDecimals(
    // Remaining balance held by vesting contract.
    Number(vestingPayment.amount) -
      // Remaining balance to vest.
      Number(vestedAmount) -
      // Take into account vested tokens that are staked. If fewer tokens
      // are staked than have unvested, no vested tokens are staked and
      // thus all vested tokens can be claimed.
      Math.max(0, Number(vestingPayment.staked_amount) - Number(vestedAmount)),
    token.decimals
  )

export const getTotalVestedAmount = ({
  vestingPayment,
  vestedAmount,
  token,
}: VestingInfo): number =>
  convertMicroDenomToDenomWithDecimals(
    // Remaining balance held by vesting contract.
    Number(vestingPayment.amount) +
      // Claimed amount.
      Number(vestingPayment.claimed_amount) -
      // Remaining balance to vest.
      Number(vestedAmount),
    token.decimals
  )

export const getTotalVestingAndVestedAmount = ({
  vestingPayment,
  token,
}: VestingInfo): number =>
  convertMicroDenomToDenomWithDecimals(
    // Remaining balance held by vesting contract.
    Number(vestingPayment.amount) +
      // Claimed amount.
      Number(vestingPayment.claimed_amount),
    token.decimals
  )
