import { useTranslation } from 'react-i18next'
import { useRecoilValueLoadable } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  ChartDataEntry,
  CopyToClipboard,
  DaoCreateVotingPowerDistributionReviewCard,
  Loader,
  TierDataEntry,
  VOTING_POWER_DISTRIBUTION_COLORS,
  useNamedThemeColor,
} from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { EntityDisplay } from '../../../components'
import { GovernanceTokenType, VotingModuleCreatorConfig } from './types'

export const GovernanceConfigurationReview = ({
  data: {
    tiers,
    tokenType,
    newInfo: { symbol: newSymbol, initialTreasuryPercent },
    existingTokenType,
    existingTokenDenomOrAddress,
  },
}: DaoCreationGovernanceConfigReviewProps<VotingModuleCreatorConfig>) => {
  const { t } = useTranslation()
  const treasuryColor = `rgba(${useNamedThemeColor('light')}, 0.45)`

  const tokenLoadable = useRecoilValueLoadable(
    genericTokenSelector({
      type: existingTokenType,
      denomOrAddress: existingTokenDenomOrAddress,
    })
  )

  // If existing token, just display the token info again since there are no
  // tier distributions to display.
  if (tokenType === GovernanceTokenType.Existing) {
    return (
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex flex-row border-b border-border-base p-4">
          <p className="primary-text text-text-body">
            {t('title.existingToken')}
          </p>
        </div>

        <div className="space-y-2 p-4">
          <CopyToClipboard takeAll value={existingTokenDenomOrAddress} />

          {tokenLoadable.state === 'loading' ? (
            <Loader />
          ) : (
            tokenLoadable.state === 'hasValue' && (
              <p className="primary-text text-text-interactive-valid">
                {t('info.foundSymbol', {
                  symbol: tokenLoadable.contents?.symbol,
                })}
              </p>
            )
          )}
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
    (tokenType === GovernanceTokenType.NewCw20
      ? newSymbol
      : tokenLoadable.state === 'hasValue' && tokenLoadable.contents?.symbol) ||
    t('info.tokens').toLocaleUpperCase()

  return (
    <DaoCreateVotingPowerDistributionReviewCard
      EntityDisplay={EntityDisplay}
      distributionPrefix={'$' + symbol + ' '}
      pieData={pieData}
      tierData={tierData}
    />
  )
}
