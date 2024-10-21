import { ComponentType } from 'react'

import { DaoRewardDistribution } from '../dao'
import { LoadingDataWithError } from '../misc'
import { StatefulDaoRewardDistributionInfoModalProps } from './DaoRewardDistributionInfoModal'

export type DaoRewardsDistributorActiveDistributionsCardProps = {
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * Distributions.
   */
  distributions: LoadingDataWithError<DaoRewardDistribution[]>
  /**
   * Stateful DaoRewardDistributionInfoModal component.
   */
  DaoRewardDistributionInfoModal: ComponentType<StatefulDaoRewardDistributionInfoModalProps>
}

export type StatefulDaoRewardsDistributorActiveDistributionsCardProps = Omit<
  DaoRewardsDistributorActiveDistributionsCardProps,
  'distributions' | 'DaoRewardDistributionInfoModal'
>
