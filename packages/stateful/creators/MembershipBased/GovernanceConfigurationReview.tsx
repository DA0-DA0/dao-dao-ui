import {
  ChartDataEntry,
  DaoCreateVotingPowerDistributionReviewCard,
  TierDataEntry,
} from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/types'
import { DISTRIBUTION_COLORS, formatPercentOf100 } from '@dao-dao/utils'

import { EntityDisplay } from '../../components/EntityDisplay'
import { CreatorData } from './types'

export const GovernanceConfigurationReview = ({
  data: { tiers },
}: DaoCreationGovernanceConfigReviewProps<CreatorData>) => {
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
        color: DISTRIBUTION_COLORS[memberIndex % DISTRIBUTION_COLORS.length],
      }))
    : // Displaying entire tier as one pie wedge.
      tiers.map(({ name, weight, members }, tierIndex) => ({
        name,
        // Membership-based DAO tier weights are for each member.
        value: ((weight * members.length) / totalWeight) * 100,
        color: DISTRIBUTION_COLORS[tierIndex % DISTRIBUTION_COLORS.length],
      }))

  const tierData: TierDataEntry[] = tiers.map(
    ({ name, weight, members }, tierIndex) => ({
      name,
      color: onlyOneTier
        ? undefined
        : DISTRIBUTION_COLORS[tierIndex % DISTRIBUTION_COLORS.length],
      members: members.map(({ address }, memberIndex) => ({
        address,
        color: onlyOneTier
          ? DISTRIBUTION_COLORS[memberIndex % DISTRIBUTION_COLORS.length]
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
      EntityDisplay={EntityDisplay}
      pieData={pieData}
      tierData={tierData}
    />
  )
}
