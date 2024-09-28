import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { TokenAmountDisplayProps } from '@dao-dao/types'
import {
  formatTime,
  getDisplayNameForChainId,
  toAccessibleImageUrl,
  toFixedDown,
} from '@dao-dao/utils'

import { ChainLogo } from '../chain/ChainLogo'
import { Tooltip } from '../tooltip/Tooltip'

// Standardized display for token amounts, with support for displaying compact
// notation of numbers and providing tooltips with precise numbers when any
// abbreviation occurs.
//
// It automatically displays max 2 decimals when abbreviating larger values,
// since the abbreviation already implies an approximate is being displayed, and
// the token decimals no longer carry the same meaning in the abbreviated value.
//
// For example: 250,319,726.80401 $JUNO abbreviates to 250.31K $JUNO, which
// looks much better than 250.319726K $JUNO.
//
// Notes:
//
// The only token amounts we intentionally don't show with full decimals are USD
// value estimates (i.e. USDC) (max 2).

// Default maximum decimals to use in a USD estimate.
const USD_ESTIMATE_DEFAULT_MAX_DECIMALS = 2
// Maximum decimals to use in a large compacted value.
const LARGE_COMPACT_MAX_DECIMALS = 2

export const TokenAmountDisplay = ({
  amount: _amount,
  decimals: _decimals = 0,
  prefix,
  prefixClassName,
  suffix,
  suffixClassName,
  minDecimals,
  maxDecimals,
  hideApprox,
  dateFetched,
  minAmount: _minAmount,
  showFullAmount,
  iconUrl,
  iconClassName,
  showChainId,
  symbol,
  hideSymbol,
  estimatedUsdValue,
  onClick,
  wrapperClassName,
  ...props
}: TokenAmountDisplayProps) => {
  const { t } = useTranslation()

  const tokenTranslation = estimatedUsdValue
    ? 'format.estUsdValue'
    : 'format.token'
  const decimals = estimatedUsdValue
    ? USD_ESTIMATE_DEFAULT_MAX_DECIMALS
    : _decimals
  const minAmount = estimatedUsdValue ? 0.01 : _minAmount

  const translateOrOmitSymbol = (translationKey: string, amount: string) =>
    hideSymbol
      ? amount
      : t(translationKey, {
          amount,
          symbol,
        })

  // If loading, display pulsing ellipses.
  if (
    typeof _amount !== 'number' &&
    _amount &&
    !(_amount instanceof HugeDecimal) &&
    'loading' in _amount &&
    _amount.loading
  ) {
    return (
      <p {...props} className={clsx('animate-pulse truncate', props.className)}>
        {translateOrOmitSymbol(tokenTranslation, '...')}
      </p>
    )
  }

  // Extract amount from loaded value.
  let amount =
    typeof _amount === 'number'
      ? _amount
      : _amount instanceof HugeDecimal
      ? _amount.toHumanReadableNumber(decimals)
      : _amount
      ? _amount.data instanceof HugeDecimal
        ? _amount.data.toHumanReadableNumber(decimals)
        : _amount.data
      : 0

  // If amount too small, set to min and add `< ` to prefix.
  const amountBelowMin = !!minAmount && amount < minAmount
  if (amountBelowMin) {
    amount = minAmount
    prefix = `< ${prefix || ''}`
  }

  const options: Intl.NumberFormatOptions = {
    // Always show all decimals if USD estimate.
    minimumFractionDigits: estimatedUsdValue
      ? USD_ESTIMATE_DEFAULT_MAX_DECIMALS
      : minDecimals,
    maximumFractionDigits: decimals,
  }

  const maxCompactDecimals =
    maxDecimals ??
    (estimatedUsdValue ? USD_ESTIMATE_DEFAULT_MAX_DECIMALS : decimals)
  const compactOptions: Intl.NumberFormatOptions & {
    roundingPriority: string
  } = {
    ...options,
    notation: 'compact',
    maximumFractionDigits: maxCompactDecimals,
    // notation=compact seems to set maximumSignificantDigits if undefined.
    // Because we are rounding toward more precision above, set
    // maximumSignificantDigits to 1 so that notation=compact does not override
    // it and display extra decimals in case maximumFractionDigits is less. This
    // appears to work fine on both Chrome and Safari, which is good enough for
    // now. This is a crazy hack.
    maximumSignificantDigits: 1,
    // Safari (and potentially other non-Chrome browsers) uses only 1 decimal
    // when notation=compact. roundingPriority=morePrecision tells the formatter
    // to resolve decimal contraint conflicts with the result with greater
    // precision.
    roundingPriority: 'morePrecision',
  }

  const full = toFixedDown(amount, decimals).toLocaleString(undefined, options)

  // Abbreviated number. Example: 1,000,000 => 1M, or 1.2345 => 1.23.
  let compact = toFixedDown(amount, maxCompactDecimals).toLocaleString(
    undefined,
    compactOptions
  )

  const largeNumber = amount >= 1000

  // If this is a large number that is compacted, and minDecimals/maxDecimals
  // are not being overridden, use fewer decimals because compact notation looks
  // bad with too many decimals. We first needed to use the same decimals to
  // compare and see if compact had any effect. If compact changed nothing, we
  // want to keep the original decimals.
  if (
    !showFullAmount &&
    largeNumber &&
    full !== compact &&
    minDecimals === undefined &&
    maxDecimals === undefined
  ) {
    compact = toFixedDown(amount, LARGE_COMPACT_MAX_DECIMALS).toLocaleString(
      undefined,
      {
        ...compactOptions,
        maximumFractionDigits: LARGE_COMPACT_MAX_DECIMALS,
      }
    )
  }

  const wasCompacted = full !== compact

  // If compact is different from full and not a large number, display
  // approximation indication (e.g. ~15.34 when the full value is 15.344913).
  // When large, the compact notation (e.g. 1.52K or 23.5M) is enough to
  // indicate that there is missing info, and we don't need the explicit
  // approximation indication.
  const display =
    (!showFullAmount &&
    wasCompacted &&
    !largeNumber &&
    !hideApprox &&
    !estimatedUsdValue
      ? '~'
      : '') +
    translateOrOmitSymbol(tokenTranslation, showFullAmount ? full : compact)

  // Show full value in tooltip if different from compact and not an estimated
  // USD value.
  const shouldShowFullTooltip =
    !showFullAmount && wasCompacted && !estimatedUsdValue && amount > 0

  return (
    <Tooltip
      title={
        // Show tooltip with full value and fetch time.
        shouldShowFullTooltip || dateFetched ? (
          <>
            {shouldShowFullTooltip &&
              // eslint-disable-next-line i18next/no-literal-string
              translateOrOmitSymbol('format.token', full)}

            {shouldShowFullTooltip && dateFetched && <br />}

            {dateFetched && (
              <span className="caption-text">
                {t('info.fetchedAtTime', {
                  time: formatTime(dateFetched),
                })}
              </span>
            )}
          </>
        ) : undefined
      }
    >
      <div
        className={clsx(
          'flex min-w-0 flex-row items-center gap-2',
          onClick &&
            'cursor-pointer transition-opacity hover:opacity-80 active:opacity-70',
          wrapperClassName
        )}
        onClick={onClick}
      >
        {/* Icon */}
        {!!iconUrl && (
          <Tooltip
            title={
              showChainId
                ? t('info.tokenOnChain', {
                    token: symbol,
                    chain: getDisplayNameForChainId(showChainId),
                  })
                : undefined
            }
          >
            <div
              className={clsx(
                'h-5 w-5 shrink-0 rounded-full bg-cover bg-center',
                showChainId && 'relative',
                iconClassName
              )}
              style={{
                backgroundImage: `url(${toAccessibleImageUrl(iconUrl)})`,
              }}
            >
              {showChainId && (
                <ChainLogo
                  chainId={showChainId}
                  className="absolute -bottom-1 -right-1"
                  size={14}
                />
              )}
            </div>
          </Tooltip>
        )}

        {/* Amount Display */}
        <p
          {...props}
          className={clsx(
            'min-w-0 max-w-full truncate',
            onClick && 'underline',
            props.className
          )}
        >
          <span className={prefixClassName}>{prefix}</span>
          {display}
          <span className={suffixClassName}>{suffix}</span>
        </p>
      </div>
    </Tooltip>
  )
}
