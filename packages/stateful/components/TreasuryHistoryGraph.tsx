import { useTranslation } from 'react-i18next'

import { StatusCard } from '@dao-dao/stateless'
import { TreasuryHistoryGraphProps } from '@dao-dao/types'

/** Historical USD valuation needs a historical-price service. Current balances
 * and operations remain independent of this explicitly unavailable feature.
 */
export const TreasuryHistoryGraph = ({
  className,
  header,
}: TreasuryHistoryGraphProps) => {
  const { t } = useTranslation()
  return (
    <div className={className}>
      {header}
      <StatusCard content={t('info.treasuryHistoryUnavailable')} style="info" />
    </div>
  )
}
