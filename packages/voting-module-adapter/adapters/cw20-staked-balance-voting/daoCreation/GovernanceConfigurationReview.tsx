import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/tstypes'
import {
  ChartDataEntry,
  CopyToClipboard,
  DaoCreateVotingPowerDistributionReviewCard,
  FormattedJSONDisplay,
  TierDataEntry,
  VOTING_POWER_DISTRIBUTION_COLORS,
  useNamedThemeColor,
} from '@dao-dao/ui'
import { formatPercentOf100 } from '@dao-dao/utils'

import { DaoCreationConfig, GovernanceTokenType } from '../types'

export const GovernanceConfigurationReview = ({
  data: {
    tiers,
    tokenType,
    newInfo: { initialTreasuryPercent },
    existingGovernanceTokenAddress,
  },
}: DaoCreationGovernanceConfigReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()
  const treasuryColor = `rgba(${useNamedThemeColor('v2-light')}, 0.45)`

  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    tokenType === GovernanceTokenType.Existing && existingGovernanceTokenAddress
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: existingGovernanceTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  // If existing token, just display the token info again since there are no
  // tier distributions to display.
  if (tokenType === GovernanceTokenType.Existing) {
    return (
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex flex-row p-4 h-14 border-b border-border-base">
          <p className="primary-text text-text-body">
            {t('title.existingToken')}
          </p>
        </div>

        <div className="p-4 space-y-4">
          <CopyToClipboard takeAll value={existingGovernanceTokenAddress} />

          <FormattedJSONDisplay
            jsonLoadable={existingGovernanceTokenInfoLoadable}
          />
        </div>
      </div>
    )
  }

  const totalWeight = tiers.reduce(
    // Multiply by member count since the tier's weight applies to each member.
    (acc, { weight, members }) => acc + weight * members.length,
    0
  )

  const onlyOneTier = tiers.length === 1

  const pieData: ChartDataEntry[] = onlyOneTier
    ? tiers[0].members.map(({ address }, memberIndex) => ({
        name: address,
        // Governance Token-based DAO tier weights are distributed amongst
        // members.
        value: tiers[0].weight / tiers[0].members.length,
        color:
          VOTING_POWER_DISTRIBUTION_COLORS[
            memberIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
          ],
      }))
    : tiers.map(({ name, weight }, tierIndex) => ({
        name,
        value: weight,
        color:
          VOTING_POWER_DISTRIBUTION_COLORS[
            tierIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
          ],
      }))
  // Add treasury.
  pieData.push({
    name: t('title.treasury'),
    value: initialTreasuryPercent,
    color: treasuryColor,
  })

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
          ((weight * members.length) / totalWeight) * 100
        ),
      })),
    })
  )
  // Add treasury to beginning.
  tierData.splice(0, 0, {
    name: t('title.treasury'),
    readableValue: formatPercentOf100(initialTreasuryPercent),
    color: treasuryColor,
  })

  return (
    <DaoCreateVotingPowerDistributionReviewCard
      pieData={pieData}
      tierData={tierData}
    />
  )
}
