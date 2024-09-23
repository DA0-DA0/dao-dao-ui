import { HugeDecimal } from '@dao-dao/math'

import { DaoRewardDistribution } from '../dao'
import { LoadingDataWithError } from '../misc'

export type DaoRewardsDistributorFundCardProps = {
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * Fund callback. Returns true if the fund was successful.
   */
  onFund: (
    distribution: DaoRewardDistribution,
    amount: HugeDecimal
  ) => Promise<boolean>
  /**
   * Whether or not the user is funding.
   */
  funding: boolean
  /**
   * Distributions.
   */
  distributions: LoadingDataWithError<DaoRewardDistribution[]>
}

export type StatefulDaoRewardsDistributorFundCardProps = Omit<
  DaoRewardsDistributorFundCardProps,
  'onFund' | 'funding' | 'distributions'
>
