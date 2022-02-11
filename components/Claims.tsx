import { MouseEventHandler } from 'react'

import { useRecoilValue } from 'recoil'

import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import { Claim, TokenInfoResponse } from '@dao-dao/types/contracts/stake-cw20'
import { CheckIcon, CurrencyDollarIcon } from '@heroicons/react/outline'

import { tokenConfig, unstakingDuration } from 'selectors/daos'
import { getBlockHeight, walletClaims } from 'selectors/treasury'
import { convertMicroDenomToDenomWithDecimals } from 'util/conversion'

import { LogoNoBorder } from './Logo'
import { humanReadableDuration } from './StakingModal'

export function claimAvaliable(claim: Claim, blockHeight: number) {
  if ('at_height' in claim.release_at) {
    return blockHeight >= claim.release_at.at_height
  } else if ('at_time' in claim.release_at) {
    const currentTimeNs = new Date().getTime() * 1000000
    return currentTimeNs >= Number(claim.release_at.at_time)
  }

  // Unreachable.
  return true
}

function claimDurationRemaining(claim: Claim, blockHeight: number): Duration {
  if (claimAvaliable(claim, blockHeight)) {
    return { time: 0 }
  }
  if ('at_height' in claim.release_at) {
    const releaseBlock = claim.release_at.at_height
    return { height: releaseBlock - blockHeight }
  } else if ('at_time' in claim.release_at) {
    const currentTimeNs = new Date().getTime() * 1000000
    return {
      time: (Number(claim.release_at.at_time) - currentTimeNs) / 1000000000, // To seconds.
    }
  }

  // Unreachable.
  return { time: 0 }
}

function ClaimListItem({
  claim,
  unstakingDuration,
  blockHeight,
  tokenInfo,
}: {
  claim: Claim
  unstakingDuration: Duration
  blockHeight: number
  tokenInfo: TokenInfoResponse
}) {
  const avaliable = claimAvaliable(claim, blockHeight)
  const durationForHumans = humanReadableDuration(unstakingDuration)
  const durationRemaining = claimDurationRemaining(claim, blockHeight)
  const durationRemainingForHumans = humanReadableDuration(durationRemaining)

  return (
    <div className="my-2">
      {avaliable ? (
        <p className="text-secondary font-mono text-sm">
          Avaliable
          <CheckIcon className="inline h-4 ml-1" />
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 text-secondary font-mono text-sm">
          <p>{durationRemainingForHumans} left</p>
          <p>/ {durationForHumans}</p>
        </div>
      )}
      <p className="mt-1">
        {convertMicroDenomToDenomWithDecimals(claim.amount, tokenInfo.decimals)}
        ${tokenInfo.symbol}
      </p>
    </div>
  )
}

export function ClaimsPendingList({
  stakingAddress,
  tokenInfo,
}: {
  stakingAddress: string
  tokenInfo: TokenInfoResponse
}) {
  const unstakeDuration = useRecoilValue(unstakingDuration(stakingAddress))
  const blockHeight = useRecoilValue(getBlockHeight)
  const claimsPending = useRecoilValue(
    walletClaims(stakingAddress)
  ).claims.filter((c) => !claimAvaliable(c, blockHeight))

  return (
    <>
      {claimsPending.length ? (
        <>
          <h2 className="mt-4">Currently unstaking</h2>
          <ul className="ml-1">
            {claimsPending.map((claim, idx) => {
              return (
                <ClaimListItem
                  key={idx}
                  claim={claim}
                  blockHeight={blockHeight}
                  unstakingDuration={unstakeDuration}
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

export function ClaimAvaliableCard({
  stakingAddress,
  tokenInfo,
  onClaim,
  loading,
}: {
  stakingAddress: string
  tokenInfo: TokenInfoResponse
  onClaim: MouseEventHandler<HTMLButtonElement>
  loading: boolean
}) {
  const blockHeight = useRecoilValue(getBlockHeight)
  const claimsAvaliable = useRecoilValue(walletClaims(stakingAddress))
    .claims.filter((c) => claimAvaliable(c, blockHeight))
    .reduce((p, n) => p + Number(n.amount), 0)

  return (
    <div className="shadow p-6 rounded-lg w-full border border-base-300 mt-2">
      <h2 className="text-sm font-mono text-secondary">
        Unclaimed (unstaked ${tokenInfo.symbol})
      </h2>
      {loading ? (
        <div className="animate-spin-medium inline-block mt-2">
          <LogoNoBorder />
        </div>
      ) : (
        <p className="mt-2 font-bold">
          {convertMicroDenomToDenomWithDecimals(
            claimsAvaliable,
            tokenInfo.decimals
          )}
          ${tokenInfo.symbol}
        </p>
      )}
      <div className="flex justify-end">
        <button
          className="btn-outline btn btn-xs border-secondary normal-case"
          onClick={onClaim}
        >
          Claim
        </button>
      </div>
    </div>
  )
}
