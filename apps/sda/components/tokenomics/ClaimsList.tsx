import { FunctionComponent } from 'react'

import { useWallet } from '@dao-dao/state'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { Button, ClaimsListItem } from '@dao-dao/ui'

import { useStakingInfo } from '@/hooks'

interface ClaimsListProps {
  showClaim: () => void
  governanceTokenInfo?: TokenInfoResponse
}

export const ClaimsList: FunctionComponent<ClaimsListProps> = ({
  showClaim,
  governanceTokenInfo,
}) => {
  const { connected } = useWallet()
  const {
    stakingContractConfig,
    blockHeight,
    claims,
    refreshClaims,
    sumClaimsAvailable,
  } = useStakingInfo({
    fetchClaims: true,
  })

  if (
    !governanceTokenInfo ||
    !stakingContractConfig ||
    !blockHeight ||
    !claims ||
    !refreshClaims ||
    sumClaimsAvailable === undefined
  ) {
    return null
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg">Unstaking {governanceTokenInfo.name} tokens</p>

        {sumClaimsAvailable > 0 && (
          <Button disabled={!connected} onClick={showClaim} variant="secondary">
            Claim
          </Button>
        )}
      </div>

      {claims.length ? (
        <div className="flex flex-col gap-1 items-stretch !mt-4">
          {claims.map((claim, idx) => (
            <ClaimsListItem
              key={idx}
              blockHeight={blockHeight}
              claim={claim}
              iconURI="/juno.svg"
              onClaimAvailable={refreshClaims}
              tokenInfo={governanceTokenInfo}
            />
          ))}
        </div>
      ) : connected ? (
        <p>You are not waiting for any tokens to unstake.</p>
      ) : (
        <p>Connect your wallet to view unstaking tokens.</p>
      )}
    </>
  )
}
