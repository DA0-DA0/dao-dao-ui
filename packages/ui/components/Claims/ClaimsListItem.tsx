import { CheckIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'

import { useTranslation } from '@dao-dao/i18n'
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

export const ClaimsListItem: FC<ClaimsListItemProps> = ({
  claim,
  blockHeight,
  tokenInfo,
  onClaimAvailable,
  iconURI,
}) => {
  const { t } = useTranslation()
  const available = claimAvailable(claim, blockHeight)
  const initialDurationRemaining = claimDurationRemaining(claim, blockHeight)

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
  }, [claim, blockHeight, setDurationRemainingForHumans])

  // Notify when the claim expires.
  const initialDurationRemainingTime =
    'time' in initialDurationRemaining && initialDurationRemaining.time
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
    <div className="flex items-center justify-between gap-2 rounded-lg bg-primary p-4">
      <div className="flex flex-row items-center gap-2">
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
          <CheckIcon className="ml-1 inline h-4" />
        </p>
      ) : (
        <p className="text-caption">
          {t('info.remainingTime', { time: durationRemainingForHumans })}
        </p>
      )}
    </div>
  )
}
