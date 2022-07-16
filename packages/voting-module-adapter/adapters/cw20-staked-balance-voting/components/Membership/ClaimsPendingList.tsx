import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { useGovernanceTokenInfo, useStakingInfo } from '@dao-dao/state'
import { ClaimsListItem, Loader, SuspenseLoader } from '@dao-dao/ui'

interface ClaimsPendingListProps {
  coreAddress: string
}

export const ClaimsPendingList: FC<ClaimsPendingListProps> = (props) => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader
      fallback={
        <>
          <h2 className="mt-4">{t('title.currentlyUnstaking')}</h2>
          <Loader />
        </>
      }
    >
      <InnerClaimsPendingList {...props} />
    </SuspenseLoader>
  )
}

const InnerClaimsPendingList: FC<ClaimsPendingListProps> = ({
  coreAddress,
}) => {
  const { t } = useTranslation()
  const { blockHeight, claimsPending, refreshClaims } = useStakingInfo(
    coreAddress,
    {
      fetchClaims: true,
    }
  )
  const { governanceTokenInfo, governanceTokenMarketingInfo } =
    useGovernanceTokenInfo(coreAddress)

  if (
    !blockHeight ||
    !claimsPending ||
    !refreshClaims ||
    !governanceTokenInfo
  ) {
    throw new Error(t('error.loadingData'))
  }

  const tokenImageUrl =
    !!governanceTokenMarketingInfo?.logo &&
    governanceTokenMarketingInfo.logo !== 'embedded' &&
    'url' in governanceTokenMarketingInfo.logo
      ? governanceTokenMarketingInfo.logo.url
      : undefined

  return claimsPending.length ? (
    <>
      <h2 className="mt-4 mb-2">{t('title.currentlyUnstaking')}</h2>

      <ul className="space-y-2">
        {claimsPending.map((claim, idx) => (
          <ClaimsListItem
            key={idx}
            blockHeight={blockHeight}
            claim={claim}
            iconURI={tokenImageUrl}
            onClaimAvailable={refreshClaims}
            tokenInfo={governanceTokenInfo}
          />
        ))}
      </ul>
    </>
  ) : null
}
