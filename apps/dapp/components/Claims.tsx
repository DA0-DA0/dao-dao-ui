import { useRecoilValue } from 'recoil'

import { TokenInfoResponse } from '@dao-dao/types/contracts/stake-cw20'
import {
  ClaimsListItem,
  ClaimsAvailableCard as StatelessClaimsAvailableCard,
} from '@dao-dao/ui'
import { claimAvailable } from '@dao-dao/utils'

import { getBlockHeight, walletClaims } from 'selectors/treasury'

export function ClaimsPendingList({
  stakingAddress,
  tokenInfo,
  onClaimAvailable,
}: {
  stakingAddress: string
  tokenInfo: TokenInfoResponse
  onClaimAvailable: () => void
}) {
  const blockHeight = useRecoilValue(getBlockHeight)
  const claimsPending = useRecoilValue(
    walletClaims(stakingAddress)
  ).claims.filter((c) => !claimAvailable(c, blockHeight))

  return (
    <>
      {claimsPending.length ? (
        <>
          <h2 className="mt-4">Currently unstaking</h2>
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
