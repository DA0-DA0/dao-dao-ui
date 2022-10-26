import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'
import { NATIVE_DECIMALS, formatTime, toFixedDown } from '@dao-dao/utils'

import { Tooltip } from './Tooltip'

export type TokenAmountDisplayProps = Omit<
  ComponentPropsWithoutRef<'p'>,
  'children'
> & {
  amount: number | LoadingData<number>
  // Full decimal precision of the value.
  decimals?: number
  prefix?: string
  suffix?: string
  // Max decimals to display.
  maxDecimals?: number
  // Don't show approximation indication (like a tilde).
  hideApprox?: boolean
  // Add to tooltip if present.
  dateFetched?: Date
} & ( // If not USDC, require symbol.
    | {
        symbol: string
        usdc?: false
      }
    // If USDC, disallow symbol.
    | {
        symbol?: never
        usdc: true
      }
  )

export const TokenAmountDisplay = ({
  amount: _amount,
  decimals = NATIVE_DECIMALS,
  prefix,
  suffix,
  maxDecimals,
  hideApprox,
  dateFetched,
  symbol: _symbol,
  usdc,
  ...props
}: TokenAmountDisplayProps) => {
  const { t } = useTranslation()

  const symbol = usdc ? 'USDC' : _symbol

  // If loading, display pulsing ellipses.
  if (typeof _amount !== 'number' && 'loading' in _amount && _amount.loading) {
    return (
      <p {...props} className={clsx('animate-pulse', props.className)}>
        {t('format.token', {
          amount: '...',
          symbol,
        })}
      </p>
    )
  }

  // Extract amount from loaded value.
  const amount = typeof _amount === 'number' ? _amount : _amount.data

  const options: Intl.NumberFormatOptions & { roundingPriority: string } = {
    maximumFractionDigits: decimals,
    // Safari (and potentially other non-Chrome browsers) uses only 1 decimal
    // when notation=compact. roundingPriority=morePrecision tells the formatter
    // to resolve decimal contraint conflicts with the result with greater
    // precision.
    roundingPriority: 'morePrecision',
  }

  const full = toFixedDown(amount, decimals).toLocaleString(undefined, options)
  // If USDC, default maxCompactDecimals to 3.
  const maxCompactDecimals = usdc ? maxDecimals ?? 3 : maxDecimals ?? decimals
  // Abbreviated number. Example: 1,000,000 => 1M
  let compact = toFixedDown(amount, maxCompactDecimals).toLocaleString(
    undefined,
    {
      ...options,
      notation: 'compact',
      maximumFractionDigits: maxCompactDecimals,
    }
  )

  // If compacted, use fewer decimals because compact looks bad with too many
  // decimals. We first needed to use the same decimals to compare and see if
  // compact had any effect. If compact changed nothing, we want to keep the
  // original decimals.
  if (full !== compact) {
    const compactedDecimals = maxDecimals ?? 2
    compact = toFixedDown(amount, compactedDecimals).toLocaleString(undefined, {
      ...options,
      notation: 'compact',
      maximumFractionDigits: compactedDecimals,
    })
  }

  const wasCompacted = full !== compact

  // Display compact.
  const display = t(
    // If compact is different from full, and smaller than 1000, display
    // approximation indication (e.g. ~15.34 when the full value is 15.344913).
    // When 1000 or larger, the compact notation (e.g. 1.52K or 23.5M) is enough
    // to indicate that there is missing info, and we don't need the explicit
    // approximation indication.
    wasCompacted && amount < 1000 && !hideApprox
      ? 'format.tokenApprox'
      : 'format.token',
    {
      amount: compact,
      symbol,
    }
  )

  return (
    <Tooltip
      title={
        (wasCompacted || dateFetched) && (
          <>
            {/* Show full in tooltip if different from compact. */}
            {wasCompacted &&
              t('format.token', {
                amount: full,
                symbol,
              })}
            {wasCompacted && dateFetched && <br />}
            {/* Show date fetched if present. */}
            {dateFetched && (
              <span className="caption-text">
                {t('info.fetchedAtTime', {
                  time: formatTime(dateFetched),
                })}
              </span>
            )}
          </>
        )
      }
    >
      <p {...props}>
        {prefix}
        {display}
        {suffix}
      </p>
    </Tooltip>
  )
}
