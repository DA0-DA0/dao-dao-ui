import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/tstypes'
import {
  ChartDataEntry,
  CopyToClipboard,
  DaoCreateVotingPowerDistributionReviewCard,
  FormattedJsonDisplay,
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
    newInfo: { symbol: newSymbol, initialTreasuryPercent },
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
      <div className="bg-background-tertiary rounded-lg">
        <div className="border-border-base flex h-14 flex-row border-b p-4">
          <p className="primary-text text-text-body">
            {t('title.existingToken')}
          </p>
        </div>

        <div className="space-y-4 p-4">
          <CopyToClipboard takeAll value={existingGovernanceTokenAddress} />

          <FormattedJsonDisplay
            jsonLoadable={existingGovernanceTokenInfoLoadable}
          />
        </div>
      </div>
    )
  }

  const onlyOneTier = tiers.length === 1

  const pieData: ChartDataEntry[] = onlyOneTier
    ? // Displaying each member of the first tier as separate pie wedges.
      tiers[0].members.map(({ address }, memberIndex) => ({
        name: address,
        // Governance token-based DAO tier weights are split amongst members.
        value: tiers[0].weight / tiers[0].members.length,
        color:
          VOTING_POWER_DISTRIBUTION_COLORS[
            memberIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
          ],
      }))
    : // Displaying entire tier as one pie wedge.
      tiers.map(({ name, weight }, tierIndex) => ({
        name,
        // Governance token-based DAO tier weights are split amongst members.
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
        // Governance token-based DAO tier weights are split amongst members.
        readableValue: formatPercentOf100(weight / members.length),
      })),
    })
  )
  // Add treasury to beginning.
  tierData.splice(0, 0, {
    name: t('title.treasury'),
    readableValue: formatPercentOf100(initialTreasuryPercent),
    color: treasuryColor,
  })

  const symbol =
    (tokenType === GovernanceTokenType.New
      ? newSymbol
      : existingGovernanceTokenInfoLoadable.state === 'hasValue' &&
        existingGovernanceTokenInfoLoadable.contents?.symbol) ||
    t('info.tokens').toLocaleUpperCase()

  return (
    <DaoCreateVotingPowerDistributionReviewCard
      distributionPrefix={'$' + symbol + ' '}
      pieData={pieData}
      tierData={tierData}
    />
  )
}
