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
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg title-text">
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
        <div className="flex flex-col gap-1 items-stretch !mt-4">
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
