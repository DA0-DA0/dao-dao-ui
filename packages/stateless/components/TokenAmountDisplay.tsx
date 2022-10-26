import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'
import { NATIVE_DECIMALS, toFixedDown } from '@dao-dao/utils'

import { Tooltip } from './Tooltip'

export type TokenAmountDisplayProps = Omit<
  ComponentPropsWithoutRef<'p'>,
  'children'
> & {
  amount: number | LoadingData<number>
  decimals?: number
  prefix?: string
  suffix?: string
  // Max to show.
  maxDecimals?: number
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
    // when notation=compact. I think notation=compact implicitly sets
    // maximumSignificantDigits=1, because roundingPriority=morePrecision tells
    // it to resolve these decimal contraint conflicts with whichever results in
    // greater precision.
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

  // Show full in tooltip if different from compact.
  const tooltip =
    full === compact
      ? // No need for tooltip if no information is hidden.
        undefined
      : t('format.token', { amount: full, symbol })

  // Display compact.
  const display = t('format.token', { amount: compact, symbol })

  return (
    <Tooltip title={tooltip}>
      <p {...props}>
        {prefix}
        {display}
        {suffix}
      </p>
    </Tooltip>
  )
}
