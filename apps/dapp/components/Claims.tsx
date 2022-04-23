import { useRecoilValue } from 'recoil'

import { TokenInfoResponse } from '@dao-dao/types/contracts/stake-cw20'
import {
  ClaimsListItem,
  ClaimsAvailableCard as StatelessClaimsAvailableCard,
} from '@dao-dao/ui'
import { claimAvailable } from '@dao-dao/utils'

import { unstakingDuration } from 'selectors/daos'
import { getBlockHeight, walletClaims } from 'selectors/treasury'

export function ClaimsPendingList({
  stakingAddress,
  tokenInfo,
  incrementClaimsAvailable,
}: {
  stakingAddress: string
  tokenInfo: TokenInfoResponse
  incrementClaimsAvailable: (n: number) => void
}) {
  const unstakeDuration = useRecoilValue(unstakingDuration(stakingAddress))
  const blockHeight = useRecoilValue(getBlockHeight)
  const claimsPending = useRecoilValue(
    walletClaims(stakingAddress)
  ).claims.filter((c) => !claimAvailable(c, blockHeight))

  return (
    <>
      {claimsPending.length ? (
        <>
          <h2 className="mt-4">Currently unstaking</h2>
          <ul className="ml-1">
            {claimsPending.map((claim, idx) => {
              return (
                <ClaimsListItem
                  key={idx}
                  blockHeight={blockHeight}
                  claim={claim}
                  incrementClaimsAvailable={incrementClaimsAvailable}
                  tokenInfo={tokenInfo}
                  unstakingDuration={unstakeDuration}
                />
              )
            })}
          </ul>
        </>
      ) : null}
    </>
  )
}

export function ClaimAvailableCard({
  stakingAddress,
  tokenInfo,
  onClaim,
  loading,
}: {
  stakingAddress: string
  tokenInfo: TokenInfoResponse
  onClaim: () => void
  loading: boolean
}) {
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
