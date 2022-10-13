import { useWalletManager } from '@noahsaso/cosmodal'
import { useTranslation } from 'react-i18next'

import { Button, ClaimsListItem } from '@dao-dao/ui'

import { BaseClaimsPendingListProps } from '../../../types'
import { useGovernanceTokenInfo, useStakingInfo } from '../hooks'

export const ClaimsPendingList = ({
  fallbackImageUrl,
  showClaim,
}: BaseClaimsPendingListProps) => {
  const { t } = useTranslation()
  const { connected } = useWalletManager()
  const { governanceTokenInfo, governanceTokenMarketingInfo } =
    useGovernanceTokenInfo()
  const { blockHeight, claims, refreshClaims, sumClaimsAvailable } =
    useStakingInfo({
      fetchClaims: true,
    })

  if (
    blockHeight === undefined ||
    !refreshClaims ||
    (connected && (!claims || sumClaimsAvailable === undefined))
  ) {
    return null
  }

  const tokenImageUrl =
    !!governanceTokenMarketingInfo.logo &&
    governanceTokenMarketingInfo.logo !== 'embedded' &&
    'url' in governanceTokenMarketingInfo.logo
      ? governanceTokenMarketingInfo.logo.url
      : undefined

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <p className="title-text text-lg">
          {t('title.unstakingNamedTokens', {
            name: '$' + governanceTokenInfo.symbol,
          })}
        </p>

        {!!sumClaimsAvailable && (
          <Button disabled={!connected} onClick={showClaim} variant="secondary">
            {t('button.claim')}
          </Button>
        )}
      </div>

      {claims?.length ? (
        <div className="!mt-4 flex flex-col items-stretch gap-1">
          {claims.map((claim, idx) => (
            <ClaimsListItem
              key={idx}
              blockHeight={blockHeight}
              claim={claim}
              iconURI={tokenImageUrl ?? fallbackImageUrl}
              onClaimAvailable={refreshClaims}
              tokenInfo={governanceTokenInfo}
            />
          ))}
        </div>
      ) : connected ? (
        <p>
          {t('info.noTokensUnstaking', {
            tokenSymbol: governanceTokenInfo.symbol,
          })}
        </p>
      ) : (
        <p>{t('info.connectWalletToViewUnstaking')}</p>
      )}
    </>
  )
}
