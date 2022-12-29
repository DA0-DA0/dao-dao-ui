import { useTranslation } from 'react-i18next'
import { useRecoilValueLoadable } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import { CopyToClipboard, FormattedJsonDisplay } from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/types'

import { DaoCreationConfig } from '../types'

export const GovernanceConfigurationReview = ({
  data: { existingGovernanceTokenAddress },
}: DaoCreationGovernanceConfigReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    Cw721BaseSelectors.contractInfoSelector({
      contractAddress: existingGovernanceTokenAddress,
      params: [],
    })
  )

  const numOfTokensLoadable = useRecoilValueLoadable(
    Cw721BaseSelectors.numTokensSelector({
      contractAddress: existingGovernanceTokenAddress,
      params: [],
    })
  )

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
