import { daoRewardsDistributorExtraQueries } from '@dao-dao/state/query'
import {
  DaoRewardsDistributorActiveDistributionsCard as StatelessDaoRewardsDistributorActiveDistributionsCard,
  useDao,
} from '@dao-dao/stateless'
import { StatefulDaoRewardsDistributorActiveDistributionsCardProps } from '@dao-dao/types'

import { useQueryLoadingDataWithError } from '../../hooks'
import { DaoRewardDistributionInfoModal } from './DaoRewardDistributionInfoModal'

export const DaoRewardsDistributorActiveDistributionsCard = (
  props: StatefulDaoRewardsDistributorActiveDistributionsCardProps
) => {
  const { chainId, coreAddress } = useDao()

  const distributions = useQueryLoadingDataWithError(
    daoRewardsDistributorExtraQueries.allDistributions({
      chainId,
      daoAddress: coreAddress,
    })
  )

  if (
    !distributions.loading &&
    !distributions.errored &&
    distributions.data.length === 0
  ) {
    return null
  }

  return (
    <StatelessDaoRewardsDistributorActiveDistributionsCard
      {...props}
      DaoRewardDistributionInfoModal={DaoRewardDistributionInfoModal}
      distributions={distributions}
    />
  )
}
