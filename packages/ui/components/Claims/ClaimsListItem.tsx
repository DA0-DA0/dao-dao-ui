import { FC, useEffect, useState } from 'react'

import { CheckIcon } from '@heroicons/react/outline'

import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
  claimAvaliable,
} from '@dao-dao/utils'

import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import { Claim, TokenInfoResponse } from '@dao-dao/types/contracts/stake-cw20'

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

export interface ClaimsListItemProps {
  claim: Claim
  unstakingDuration: Duration
  blockHeight: number
  tokenInfo: TokenInfoResponse
  incrementClaimsAvaliable: (n: number) => void
}

export const ClaimsListItem: FC<ClaimsListItemProps> = ({
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
}) => {
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
