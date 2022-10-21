import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/types'
import {
  ChartDataEntry,
  DaoCreateVotingPowerDistributionReviewCard,
  TierDataEntry,
  VOTING_POWER_DISTRIBUTION_COLORS,
} from '@dao-dao/stateless'
import { formatPercentOf100 } from '@dao-dao/utils'

import { DaoCreationConfig } from '../types'

export const GovernanceConfigurationReview = ({
  data: { tiers },
}: DaoCreationGovernanceConfigReviewProps<DaoCreationConfig>) => {
  const totalWeight = tiers.reduce(
    // Multiply by member count since the tier's weight applies to each member.
    (acc, { weight, members }) => acc + weight * members.length,
    0
  )

  const onlyOneTier = tiers.length === 1

  const pieData: ChartDataEntry[] = onlyOneTier
    ? // Displaying each member of the first tier as separate pie wedges.
      tiers[0].members.map(({ address }, memberIndex) => ({
        name: address,
        // Membership-based DAO tier weights are for each member.
        value: (tiers[0].weight / totalWeight) * 100,
        color:
          VOTING_POWER_DISTRIBUTION_COLORS[
            memberIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
          ],
      }))
    : // Displaying entire tier as one pie wedge.
      tiers.map(({ name, weight, members }, tierIndex) => ({
        name,
        // Membership-based DAO tier weights are for each member.
        value: ((weight * members.length) / totalWeight) * 100,
        color:
          VOTING_POWER_DISTRIBUTION_COLORS[
            tierIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
          ],
      }))

  const tierData: TierDataEntry[] = tiers.map(
    ({ name, weight, members }, tierIndex) => ({
      name,
      color: onlyOneTier
        ? undefined
        : VOTING_POWER_DISTRIBUTION_COLORS[
            tierIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
          ],
      members: members.map(({ address }, memberIndex) => ({
        address,
        color: onlyOneTier
          ? VOTING_POWER_DISTRIBUTION_COLORS[
              memberIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
            ]
          : undefined,
        readableValue: formatPercentOf100(
          // Membership-based DAO tier weights are for each member.
          (weight / totalWeight) * 100
        ),
      })),
    })
  )

  return (
    <DaoCreateVotingPowerDistributionReviewCard
      pieData={pieData}
      tierData={tierData}
    />
  )
}
