import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { TokenInfoResponse } from '@dao-dao/types/contracts/stake-cw20'
import {
  ClaimsListItem,
  ClaimsAvailableCard as StatelessClaimsAvailableCard,
} from '@dao-dao/ui'
import { claimAvailable } from '@dao-dao/utils'

import { getBlockHeight, walletClaims } from 'selectors/treasury'

import { Loader } from './Loader'
import { SuspenseLoader } from './SuspenseLoader'

interface ClaimsPendingListProps {
  stakingAddress: string
  tokenInfo: TokenInfoResponse
  onClaimAvailable: () => void
}

const InnerClaimsPendingList: FC<ClaimsPendingListProps> = ({
  stakingAddress,
  tokenInfo,
  onClaimAvailable,
}) => {
  const blockHeight = useRecoilValue(getBlockHeight)
  const claimsPending = useRecoilValue(
    walletClaims(stakingAddress)
  ).claims.filter((c) => !claimAvailable(c, blockHeight))

  return claimsPending.length ? (
    <ul className="ml-1 space-y-2">
      {claimsPending.map((claim, idx) => {
        return (
          <ClaimsListItem
            key={idx}
            blockHeight={blockHeight}
            claim={claim}
            onClaimAvailable={onClaimAvailable}
            tokenInfo={tokenInfo}
          />
        )
      })}
    </ul>
  ) : null
}

export const ClaimsPendingList: FC<ClaimsPendingListProps> = (props) => (
  <>
    <h2 className="mt-4">Currently unstaking</h2>

    <SuspenseLoader fallback={<Loader />}>
      <InnerClaimsPendingList {...props} />
    </SuspenseLoader>
  </>
)

interface ClaimsAvailableCardProps {
  stakingAddress: string
  tokenInfo: TokenInfoResponse
  onClaim: () => void
  loading: boolean
}

const InnerClaimAvailableCard: FC<ClaimsAvailableCardProps> = ({
  stakingAddress,
  tokenInfo,
  onClaim,
  loading,
}) => {
  const blockHeight = useRecoilValue(getBlockHeight)
  const claimsAvailable = useRecoilValue(walletClaims(stakingAddress))
    .claims.filter((c) => claimAvailable(c, blockHeight))
    .reduce((p, n) => p + Number(n.amount), 0)

  return (
    <StatelessClaimsAvailableCard
      available={claimsAvailable}
      loading={loading}
      onClaim={onClaim}
      tokenInfo={tokenInfo}
    />
  )
}

export const ClaimAvailableCard: FC<ClaimsAvailableCardProps> = (props) => (
  <SuspenseLoader
    fallback={
      <div className="p-6 mt-2 w-full rounded-lg border shadow border-base-300">
        <Loader />
      </div>
    }
  >
    <InnerClaimAvailableCard {...props} />
  </SuspenseLoader>
)
