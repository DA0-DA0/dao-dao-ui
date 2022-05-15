import { FC } from 'react'

import { useGovernanceTokenInfo, useStakingInfo } from '@dao-dao/state'
import { ClaimsListItem } from '@dao-dao/ui'

import { Loader } from './Loader'
import { SuspenseLoader } from './SuspenseLoader'

interface ClaimsPendingListProps {
  coreAddress: string
  onClaimAvailable: () => void
}

const InnerClaimsPendingList: FC<ClaimsPendingListProps> = ({
  coreAddress,
  onClaimAvailable,
}) => {
  const { blockHeight, claimsPending } = useStakingInfo(coreAddress, {
    fetchClaims: true,
  })
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)

  if (!blockHeight || !governanceTokenInfo) {
    throw new Error('Failed to load data.')
  }

  return claimsPending?.length ? (
    <>
      <h2 className="mt-4">Currently unstaking</h2>

      <ul className="ml-1 space-y-2">
        {claimsPending.map((claim, idx) => (
          <ClaimsListItem
            key={idx}
            blockHeight={blockHeight}
            claim={claim}
            onClaimAvailable={onClaimAvailable}
            tokenInfo={governanceTokenInfo}
          />
        ))}
      </ul>
    </>
  ) : null
}

export const ClaimsPendingList: FC<ClaimsPendingListProps> = (props) => (
  <SuspenseLoader
    fallback={
      <>
        <h2 className="mt-4">Currently unstaking</h2>
        <Loader />
      </>
    }
  >
    <InnerClaimsPendingList {...props} />
  </SuspenseLoader>
)
