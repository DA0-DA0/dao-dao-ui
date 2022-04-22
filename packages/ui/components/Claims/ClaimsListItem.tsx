import { FC, useEffect, useState } from 'react'

import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import { Claim, TokenInfoResponse } from '@dao-dao/types/contracts/stake-cw20'
import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
  claimAvailable,
} from '@dao-dao/utils'
import { CheckIcon } from '@heroicons/react/outline'

import { BalanceIcon } from '../ContractView/BalanceIcon'

function claimDurationRemaining(claim: Claim, blockHeight: number): Duration {
  if (claimAvailable(claim, blockHeight)) {
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
  incrementClaimsAvailable: (n: number) => void
  iconURI?: string
}

export const ClaimsListItem: FC<ClaimsListItemProps> = ({
  claim,
  unstakingDuration,
  blockHeight,
  tokenInfo,
  incrementClaimsAvailable,
  iconURI,
}) => {
  const available = claimAvailable(claim, blockHeight)

  const durationForHumans = humanReadableDuration(unstakingDuration)
  const durationRemaining = claimDurationRemaining(claim, blockHeight)

  // Once the claim expires increment claims available.
  useEffect(() => {
    if ('time' in durationRemaining) {
      const id = setTimeout(
        () => incrementClaimsAvailable(Number(claim.amount)),
        durationRemaining.time * 1000
      )
      return () => clearTimeout(id)
    }
  }, [claim.amount, durationRemaining, incrementClaimsAvailable])

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
    <div className="flex gap-2 justify-between items-center p-4 my-2 rounded-lg bg-primary">
      <p className="flex gap-2 items-center">
        <BalanceIcon iconURI={iconURI} />
        {convertMicroDenomToDenomWithDecimals(
          claim.amount,
          tokenInfo.decimals
        ).toLocaleString(undefined, {
          maximumFractionDigits: tokenInfo.decimals,
        })}{' '}
        ${tokenInfo.symbol}
      </p>

      {available ? (
        <p className="font-mono text-sm text-secondary">
          Available
          <CheckIcon className="inline ml-1 h-4" />
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 text-caption">
          <p>{durationRemainingForHumans || '0'} remaining</p>
          <p>/ {durationForHumans}</p>
        </div>
      )}
    </div>
  )
}
