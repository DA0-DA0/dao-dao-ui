import { useTranslation } from 'react-i18next'

import { Cw721BaseSelectors } from '@dao-dao/state'
import {
  ChartDataEntry,
  CopyToClipboard,
  DaoCreateVotingPowerDistributionReviewCard,
  FormattedJsonDisplay,
  TierDataEntry,
  VOTING_POWER_DISTRIBUTION_COLORS,
  useCachedLoadable,
  useChain,
} from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { EntityDisplay } from '../../components/EntityDisplay'
import { CreatorData, GovernanceTokenType } from './types'

export const GovernanceConfigurationReview = ({
  data: { tokenType, newInfo, existingGovernanceTokenDenomOrAddress },
}: DaoCreationGovernanceConfigReviewProps<CreatorData>) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  const existingGovernanceTokenInfoLoadable = useCachedLoadable(
    tokenType === GovernanceTokenType.Existing
      ? Cw721BaseSelectors.contractInfoSelector({
          chainId,
          contractAddress: existingGovernanceTokenDenomOrAddress,
          params: [],
        })
      : undefined
  )

  const numOfTokensLoadable = useCachedLoadable(
    tokenType === GovernanceTokenType.Existing
      ? Cw721BaseSelectors.numTokensSelector({
          chainId,
          contractAddress: existingGovernanceTokenDenomOrAddress,
          params: [],
        })
      : undefined
  )

  const countPerMember = Object.entries(
    newInfo.initialNfts.reduce((acc, { owner }) => {
      const member = owner.trim()
      return {
        ...acc,
        [member]: (acc[member] || 0) + 1,
      }
    }, {} as Record<string, number>)
  )
  const pieData: ChartDataEntry[] = countPerMember.map(
    ([member, count], memberIndex) => ({
      name: member,
      value: count,
      color:
        VOTING_POWER_DISTRIBUTION_COLORS[
          memberIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
        ],
    })
  )

  const tierEntry: TierDataEntry = {
    members: countPerMember.map(([address, count], index) => ({
      address,
      color:
        VOTING_POWER_DISTRIBUTION_COLORS[
          index % VOTING_POWER_DISTRIBUTION_COLORS.length
        ],
      readableValue: formatPercentOf100(
        (count / newInfo.initialNfts.length) * 100
      ),
    })),
  }

  return tokenType === GovernanceTokenType.New ? (
    <DaoCreateVotingPowerDistributionReviewCard
      EntityDisplay={EntityDisplay}
      distributionPrefix={'$' + newInfo.symbol + ' '}
      pieData={pieData}
      tierData={[tierEntry]}
    />
  ) : (
    <div className="rounded-lg bg-background-tertiary">
      <div className="flex h-14 flex-row border-b border-border-base p-4">
        <p className="primary-text text-text-body">
          {t('title.nftCollection')}
        </p>
      </div>

      <div className="space-y-4 p-4">
        <CopyToClipboard
          takeAll
          value={existingGovernanceTokenDenomOrAddress}
        />

        <FormattedJsonDisplay
          jsonLoadable={existingGovernanceTokenInfoLoadable}
          title={t('title.collectionInfo')}
        />
        <FormattedJsonDisplay
          jsonLoadable={numOfTokensLoadable}
          title={t('title.totalSupply')}
        />
      </div>
    </div>
  )
}
