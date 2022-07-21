import { useTranslation } from 'react-i18next'

import { ClaimsListItem, Loader, SuspenseLoader } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../../react/context'
import { useGovernanceTokenInfo, useStakingInfo } from '../../hooks'

export const ClaimsPendingList = () => {
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
      <InnerClaimsPendingList />
    </SuspenseLoader>
  )
}

const InnerClaimsPendingList = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
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
