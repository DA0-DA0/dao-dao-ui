import { FunctionComponent } from 'react'

import { useWallet } from '@dao-dao/state'
import { Button, ClaimsListItem } from '@dao-dao/ui'

import { useGovernanceTokenInfo, useStakingInfo } from '@/hooks'

interface ClaimsListProps {
  showClaim: () => void
}

export const ClaimsList: FunctionComponent<ClaimsListProps> = ({
  showClaim,
}) => {
  const { connected } = useWallet()
  const { governanceTokenInfo } = useGovernanceTokenInfo()
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
    !refreshClaims ||
    (connected && (!claims || sumClaimsAvailable === undefined))
  ) {
    return null
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg">Unstaking {governanceTokenInfo.name} tokens</p>

        {!!sumClaimsAvailable && (
          <Button disabled={!connected} onClick={showClaim} variant="secondary">
            Claim
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
