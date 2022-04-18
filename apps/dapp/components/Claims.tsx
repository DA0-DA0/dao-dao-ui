import { MouseEventHandler } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { useRecoilValue } from 'recoil'

import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import { Claim, TokenInfoResponse } from '@dao-dao/types/contracts/stake-cw20'
import { LogoNoBorder } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
} from '@dao-dao/utils'
import { CheckIcon } from '@heroicons/react/outline'

import { unstakingDuration } from 'selectors/daos'
import { getBlockHeight, walletClaims } from 'selectors/treasury'

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
      time:
        (Number(claim.release_at.at_time) - currentTimeNs) / 1000000000 || 0, // To seconds.
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
  incrementClaimsAvaliable,
}: {
  claim: Claim
  unstakingDuration: Duration
  blockHeight: number
  tokenInfo: TokenInfoResponse
  incrementClaimsAvaliable: (n: number) => void
}) {
  const avaliable = claimAvaliable(claim, blockHeight)

  const durationForHumans = humanReadableDuration(unstakingDuration)
  const durationRemaining = claimDurationRemaining(claim, blockHeight)

  // Once the claim expires increment claims avaliable.
  useEffect(() => {
    if ('time' in durationRemaining) {
      const id = setTimeout(
        () => incrementClaimsAvaliable(Number(claim.amount)),
        durationRemaining.time * 1000
      )
      return () => clearTimeout(id)
    }
  }, [claim.amount, durationRemaining, incrementClaimsAvaliable])

  const [durationRemainingForHumans, setDurationRemainingForHumans] = useState(
    humanReadableDuration(durationRemaining)
  )

  useEffect(() => {
    const id = setInterval(() => {
      setDurationRemainingForHumans((_) =>
        humanReadableDuration(claimDurationRemaining(claim, blockHeight))
      )
    }, 1000)
    return () => clearInterval(id)
  }, [claim, blockHeight, setDurationRemainingForHumans])

  return (
    <div className="my-2">
      {avaliable ? (
        <p className="font-mono text-sm text-secondary">
          Avaliable
          <CheckIcon className="inline ml-1 h-4" />
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 font-mono text-sm text-secondary">
          <p>{durationRemainingForHumans || '0'} left</p>
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
  incrementClaimsAvaliable,
}: {
  stakingAddress: string
  tokenInfo: TokenInfoResponse
  incrementClaimsAvaliable: (n: number) => void
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
                  blockHeight={blockHeight}
                  claim={claim}
                  incrementClaimsAvaliable={incrementClaimsAvaliable}
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
    <div className="p-6 mt-2 w-full rounded-lg border shadow border-base-300">
      <h2 className="font-mono text-sm text-secondary">
        Unclaimed (unstaked ${tokenInfo.symbol})
      </h2>
      {loading ? (
        <div className="inline-block mt-2 animate-spin-medium">
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
          className="normal-case btn-outline btn btn-xs border-secondary"
          onClick={onClaim}
        >
          Claim
        </button>
      </div>
    </div>
  )
}
