import { useTranslation } from 'react-i18next'

import { DaoInfoCards, UsdValuationDisplay, useDao } from '@dao-dao/stateless'

import { useQueryLoadingData } from '../../hooks'

export const GovInfoBar = () => {
  const { t } = useTranslation()

  const dao = useDao()
  const tvlLoading = useQueryLoadingData(dao.tvlQuery, {
    amount: null,
    status: 'unavailable' as const,
    timestamp: null,
    unpricedTokens: 0,
    incompleteBalances: true,
  })

  return (
    <DaoInfoCards
      cards={[
        {
          label: t('title.treasury'),
          tooltip: t('info.estimatedTreasuryUsdValueTooltip'),
          value: (
            <UsdValuationDisplay
              value={tvlLoading.loading ? { loading: true } : tvlLoading.data}
            />
          ),
        },
      ]}
    />
  )
}
