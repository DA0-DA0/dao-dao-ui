import { FC } from 'react'

import { useGovernanceTokenInfo, useStakingInfo } from '@dao-dao/state'
import { ClaimsListItem, SuspenseLoader } from '@dao-dao/ui'

import { useDAOInfoContext } from './DAOPageWrapper'
import { Loader } from './Loader'

interface ClaimsPendingListProps {
  onClaimAvailable: () => void
}

const InnerClaimsPendingList: FC<ClaimsPendingListProps> = ({
  onClaimAvailable,
}) => {
  const { coreAddress } = useDAOInfoContext()
  const { blockHeight, claimsPending } = useStakingInfo(coreAddress, {
    fetchClaims: true,
  })
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)

  if (!blockHeight || !governanceTokenInfo) {
    throw new Error('Failed to load data.')
  }

  return claimsPending?.length ? (
    <>
      <h2 className="mt-4 mb-2">Currently unstaking</h2>

      <ul className="space-y-2">
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
