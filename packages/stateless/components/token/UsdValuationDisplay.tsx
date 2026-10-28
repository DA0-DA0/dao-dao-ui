import { useTranslation } from 'react-i18next'

import { UsdValuation } from '@dao-dao/types'

/** Unknown is not zero. Do not present a known subtotal as a complete portfolio. */
export const UsdValuationDisplay = ({
  value,
}: {
  value: UsdValuation | { loading: true }
}) => {
  const { t } = useTranslation()
  if ('loading' in value) return <span className="animate-pulse">...</span>
  if (
    value.amount === null ||
    (value.timestamp !== null && Date.now() - value.timestamp > 300_000)
  )
    return <span>{t('info.usdEstimateUnavailable')}</span>
  return (
    <span className="inline-flex flex-col">
      <span>
        {value.amount.toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      {value.status === 'partial' && (
        <span className="caption-text">{t('info.partialUsdEstimate')}</span>
      )}
    </span>
  )
}
