import { useTranslation } from 'react-i18next'

import {
  DaoInfoCards,
  TokenAmountDisplay,
  useDaoContext,
} from '@dao-dao/stateless'

import { useQueryLoadingData } from '../../hooks'

export const GovInfoBar = () => {
  const { t } = useTranslation()

  const { dao } = useDaoContext()
  const tvlLoading = useQueryLoadingData(dao.tvlQuery, {
    amount: -1,
    timestamp: Date.now(),
  })

  return (
    <DaoInfoCards
      cards={[
        {
          label: t('title.treasury'),
          tooltip: t('info.estimatedTreasuryUsdValueTooltip'),
          value: (
            <TokenAmountDisplay
              amount={
                tvlLoading.loading ? { loading: true } : tvlLoading.data.amount
              }
              dateFetched={
                tvlLoading.loading
                  ? undefined
                  : new Date(tvlLoading.data.timestamp)
              }
              estimatedUsdValue
              hideApprox
            />
          ),
        },
      ]}
    />
  )
}
