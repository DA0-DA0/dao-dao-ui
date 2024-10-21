import { HugeDecimal } from '@dao-dao/math'

import { DaoRewardDistribution } from '../dao'
import { LoadingDataWithError } from '../misc'

export type StatelessDaoRewardDistributionInfoModalProps = {
  /**
   * Distribution. If undefined, modal is closed.
   */
  distribution: DaoRewardDistribution | undefined
  /**
   * Remaining distribution rewards.
   */
  remaining: LoadingDataWithError<HugeDecimal>
  /**
   * Whether or not the modal is visible. This should only be true when
   * distribution is defined, but may be false when distribution is defined to
   * prevent UI stuttering when closing.
   */
  visible: boolean
  /**
   * Close callback.
   */
  onClose: () => void
  /**
   * Fund distribution callback. Returns true if the fund was successful.
   */
  onFund: (amount: HugeDecimal) => Promise<boolean>
  /**
   * Whether or not the user is funding.
   */
  funding: boolean
}

export type StatefulDaoRewardDistributionInfoModalProps = Omit<
  StatelessDaoRewardDistributionInfoModalProps,
  'onFund' | 'funding' | 'remaining' | 'visible'
>
