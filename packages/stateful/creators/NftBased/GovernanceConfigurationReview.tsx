import { useTranslation } from 'react-i18next'

import { CopyToClipboard } from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/types'

import { CreatorData } from './types'

export const GovernanceConfigurationReview = ({
  data: { existingGovernanceNftCollectionAddress, existingCollectionInfo },
}: DaoCreationGovernanceConfigReviewProps<CreatorData>) => {
  const { t } = useTranslation()

  return (
    <div className="rounded-lg bg-background-tertiary">
      <div className="flex h-14 flex-row border-b border-border-base p-4">
        <p className="primary-text text-text-body">
          {t('title.nftCollection')}
        </p>
      </div>

      <div className="space-y-4 p-4">
        <CopyToClipboard
          takeAll
          value={existingGovernanceNftCollectionAddress}
        />

        {existingCollectionInfo && (
          <p className="primary-text text-text-interactive-valid">
            ${existingCollectionInfo.symbol}
          </p>
        )}
      </div>
    </div>
  )
}
