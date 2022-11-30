import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import {
  CopyToClipboard,
  DaoCreateVotingPowerDistributionReviewCard,
  FormattedJsonDisplay,
} from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/types'

import { DaoCreationConfig, GovernanceTokenType } from '../types'

export const GovernanceConfigurationReview = ({
  data: { tokenType, existingGovernanceTokenAddress },
}: DaoCreationGovernanceConfigReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    tokenType === GovernanceTokenType.Existing && existingGovernanceTokenAddress
      ? Cw721BaseSelectors.contractInfoSelector({
          contractAddress: existingGovernanceTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  const numOfTokensLoadable = useRecoilValueLoadable(
    tokenType === GovernanceTokenType.Existing && existingGovernanceTokenAddress
      ? Cw721BaseSelectors.numTokensSelector({
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
        <div className="flex h-14 flex-row border-b border-border-base p-4">
          <p className="primary-text text-text-body">
            {t('title.existingToken')}
          </p>
        </div>

        <div className="space-y-4 p-4">
          <CopyToClipboard takeAll value={existingGovernanceTokenAddress} />

          <FormattedJsonDisplay
            jsonLoadable={existingGovernanceTokenInfoLoadable}
          />
          <FormattedJsonDisplay
            jsonLoadable={numOfTokensLoadable}
            title={t('title.totalSupply')}
          />
        </div>
      </div>
    )
  }

  const symbol = t('info.tokens').toLocaleUpperCase()

  return (
    <DaoCreateVotingPowerDistributionReviewCard
      distributionPrefix={'$' + symbol + ' '}
      pieData={[]}
      tierData={[]}
    />
  )
}
