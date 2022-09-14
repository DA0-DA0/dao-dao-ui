import { CheckIcon } from '@heroicons/react/outline'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import { Claim, TokenInfoResponse } from '@dao-dao/types/contracts/stake-cw20'
import {
  claimAvailable,
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
} from '@dao-dao/utils'

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
  blockHeight: number
  tokenInfo: TokenInfoResponse
  onClaimAvailable: () => void
  iconURI?: string
}

export const ClaimsListItem = ({
  claim,
  blockHeight,
  tokenInfo,
  onClaimAvailable,
  iconURI,
}: ClaimsListItemProps) => {
  const { t } = useTranslation()
  const { available, initialDurationRemaining } = useMemo(
    () => ({
      available: claimAvailable(claim, blockHeight),
      initialDurationRemaining: claimDurationRemaining(claim, blockHeight),
    }),
    [blockHeight, claim]
  )

  // Format for humans each second to count down.
  const [durationRemainingForHumans, setDurationRemainingForHumans] = useState(
    humanReadableDuration(initialDurationRemaining)
  )
  useEffect(() => {
    const update = () =>
      setDurationRemainingForHumans((_) =>
        humanReadableDuration(claimDurationRemaining(claim, blockHeight))
      )
    // Run on claim update.
    update()

    const id = setInterval(update, 1000)

    return () => clearInterval(id)
  }, [blockHeight, claim])

  // Notify when the claim expires.
  const initialDurationRemainingTime =
    'time' in initialDurationRemaining &&
    Math.round(initialDurationRemaining.time)
  useEffect(() => {
    if (initialDurationRemainingTime) {
      const id = setTimeout(
        onClaimAvailable,
        initialDurationRemainingTime * 1000
      )
      return () => clearTimeout(id)
    }
  }, [initialDurationRemainingTime, onClaimAvailable])

  return (
    <div className="flex gap-2 justify-between items-center p-4 bg-primary rounded-lg">
      <div className="flex flex-row gap-2 items-center">
        <BalanceIcon iconURI={iconURI} />

        <p>
          {convertMicroDenomToDenomWithDecimals(
            claim.amount,
            tokenInfo.decimals
          ).toLocaleString(undefined, {
            maximumFractionDigits: tokenInfo.decimals,
          })}{' '}
          ${tokenInfo.symbol}
        </p>
      </div>

      {available ? (
        <p className="font-mono text-sm text-secondary">
          {t('info.available')}
          <CheckIcon className="inline ml-1 h-4" />
        </p>
      ) : (
        <p className="text-caption">
          {t('info.remainingTime', { time: durationRemainingForHumans })}
        </p>
      )}
    </div>
  )
}
