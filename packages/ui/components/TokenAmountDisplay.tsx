import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/tstypes'

import { Tooltip } from './Tooltip'

export type TokenAmountDisplayProps = Omit<
  ComponentPropsWithoutRef<'p'>,
  'children'
> & {
  amount: number | LoadingData<number>
  prefix?: string
  suffix?: string
  minDecimals?: number
  maxDecimals?: number
  minSignificant?: number
  maxSignificant?: number
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
  prefix,
  suffix,
  minDecimals,
  minSignificant,
  maxSignificant,
  ...props
}: TokenAmountDisplayProps) => {
  const { t } = useTranslation()

  const symbol = props.usdc ? 'USDC' : props.symbol

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

  // If USDC, default maxDecimals to 3.
  const maxDecimals = props.usdc ? props.maxDecimals ?? 3 : props.maxDecimals
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
    minimumSignificantDigits: minSignificant,
    maximumSignificantDigits: maxSignificant,
  }

  const full = amount.toLocaleString(undefined, options)
  // Abbreviated number. Example: 1,000,000 => 1M
  let compact = amount.toLocaleString(undefined, {
    notation: 'compact',
    ...options,
  })

  // If compacted, use fewer decimals because compact looks bad with too many
  // decimals. We first needed to use the same decimals to compare and see if
  // compact had any effect. If compact changed nothing, we want to keep the
  // original decimals.
  if (full !== compact) {
    compact = amount.toLocaleString(undefined, {
      notation: 'compact',
      ...options,
      maximumFractionDigits: 2,
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
