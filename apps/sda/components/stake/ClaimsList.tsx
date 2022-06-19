import { FunctionComponent } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import {
  useGovernanceTokenInfo,
  useStakingInfo,
  useWallet,
} from '@dao-dao/state'
import { Button, ClaimsListItem } from '@dao-dao/ui'

import { useDAOInfoContext } from '../DAOInfoContext'
import { DAO_ADDRESS, DEFAULT_IMAGE_URL } from '@/util'

interface ClaimsListProps {
  showClaim: () => void
}

export const ClaimsList: FunctionComponent<ClaimsListProps> = ({
  showClaim,
}) => {
  const { t } = useTranslation()
  const { connected } = useWallet()
  const { governanceTokenInfo } = useGovernanceTokenInfo(DAO_ADDRESS)
  const {
    stakingContractConfig,
    blockHeight,
    claims,
    refreshClaims,
    sumClaimsAvailable,
  } = useStakingInfo(DAO_ADDRESS, {
    fetchClaims: true,
  })

  const { imageUrl } = useDAOInfoContext()

  if (
    !governanceTokenInfo ||
    !stakingContractConfig ||
    !blockHeight ||
    !refreshClaims ||
    (connected && (!claims || sumClaimsAvailable === undefined))
  ) {
    return null
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg title-text">
          {t('unstakingNamedTokens', { name: governanceTokenInfo.name })}
        </p>

        {!!sumClaimsAvailable && (
          <Button disabled={!connected} onClick={showClaim} variant="secondary">
            {t('claim')}
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
              iconURI={imageUrl ?? DEFAULT_IMAGE_URL}
              onClaimAvailable={refreshClaims}
              tokenInfo={governanceTokenInfo}
            />
          ))}
        </div>
      ) : connected ? (
        <p>{t('noTokensUnstaking')}</p>
      ) : (
        <p>{t('connectWalletToViewUnstaking')}</p>
      )}
    </>
  )
}
