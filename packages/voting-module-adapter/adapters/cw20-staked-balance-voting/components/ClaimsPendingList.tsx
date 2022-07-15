import { ComponentType, FC } from 'react'
import { useTranslation } from 'react-i18next'

import { useGovernanceTokenInfo, useStakingInfo } from '@dao-dao/state'
import { ClaimsListItem, SuspenseLoader } from '@dao-dao/ui'

interface ClaimsPendingListProps {
  coreAddress: string
  Loader: ComponentType
  onClaimAvailable: () => void
}

export const ClaimsPendingList: FC<ClaimsPendingListProps> = (props) => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader
      fallback={
        <>
          <h2 className="mt-4">{t('title.currentlyUnstaking')}</h2>
          <props.Loader />
        </>
      }
    >
      <InnerClaimsPendingList {...props} />
    </SuspenseLoader>
  )
}

const InnerClaimsPendingList: FC<ClaimsPendingListProps> = ({
  coreAddress,
  onClaimAvailable,
}) => {
  const { t } = useTranslation()
  const { blockHeight, claimsPending } = useStakingInfo(coreAddress, {
    fetchClaims: true,
  })
  const { governanceTokenInfo, governanceTokenMarketingInfo } =
    useGovernanceTokenInfo(coreAddress)

  if (!blockHeight || !governanceTokenInfo) {
    throw new Error('Failed to load data.')
  }

  const tokenImageUrl =
    !!governanceTokenMarketingInfo?.logo &&
    governanceTokenMarketingInfo.logo !== 'embedded' &&
    'url' in governanceTokenMarketingInfo.logo
      ? governanceTokenMarketingInfo.logo.url
      : undefined

  return claimsPending?.length ? (
    <>
      <h2 className="mt-4 mb-2">{t('title.currentlyUnstaking')}</h2>

      <ul className="space-y-2">
        {claimsPending.map((claim, idx) => (
          <ClaimsListItem
            key={idx}
            blockHeight={blockHeight}
            claim={claim}
            iconURI={tokenImageUrl}
            onClaimAvailable={onClaimAvailable}
            tokenInfo={governanceTokenInfo}
          />
        ))}
      </ul>
    </>
  ) : null
}
