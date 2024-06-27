import { useTranslation } from 'react-i18next'
import { useRecoilValueLoadable } from 'recoil'

import { CommonNftSelectors } from '@dao-dao/state'
import {
  CopyToClipboard,
  FormattedJsonDisplay,
  useChain,
} from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/types'

import { CreatorData } from './types'

export const GovernanceConfigurationReview = ({
  data: { existingGovernanceNftCollectionAddress },
}: DaoCreationGovernanceConfigReviewProps<CreatorData>) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    CommonNftSelectors.contractInfoSelector({
      chainId,
      contractAddress: existingGovernanceNftCollectionAddress,
      params: [],
    })
  )

  const numOfTokensLoadable = useRecoilValueLoadable(
    CommonNftSelectors.numTokensSelector({
      chainId,
      contractAddress: existingGovernanceNftCollectionAddress,
      params: [],
    })
  )

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
