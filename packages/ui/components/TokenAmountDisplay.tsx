import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Tooltip } from './Tooltip'

export interface TokenAmountDisplayProps
  extends Omit<ComponentPropsWithoutRef<'p'>, 'children'> {
  amount: number
  symbol: string
  minDecimals?: number
  maxDecimals: number
  minSignificant?: number
  maxSignificant?: number
}

export const TokenAmountDisplay = forwardRef<
  HTMLParagraphElement,
  TokenAmountDisplayProps
>(function TokenAmountDisplay(
  {
    amount,
    symbol,
    minDecimals,
    maxDecimals,
    minSignificant,
    maxSignificant,
    ...props
  },
  ref
) {
  const { t } = useTranslation()

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
    minimumSignificantDigits: minSignificant,
    maximumSignificantDigits: maxSignificant,
  }

  const full = amount.toLocaleString(undefined, options)
  // Abbreviated number. Example: 1,000,000 => 1M
  const compact = amount.toLocaleString(undefined, {
    notation: 'compact',
    ...options,
  })

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
      <p {...props} ref={ref}>
        {display}
      </p>
    </Tooltip>
  )
})
