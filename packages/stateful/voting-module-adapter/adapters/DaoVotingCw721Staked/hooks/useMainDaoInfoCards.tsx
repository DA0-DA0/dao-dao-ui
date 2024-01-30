import { useTranslation } from 'react-i18next'

import { TokenAmountDisplay } from '@dao-dao/stateless'
import { DaoInfoCard } from '@dao-dao/types'
import {
  convertDurationToHumanReadableString,
  formatPercentOf100,
} from '@dao-dao/utils'

import { useGovernanceCollectionInfo } from './useGovernanceCollectionInfo'
import { useStakingInfo } from './useStakingInfo'

export const useMainDaoInfoCards = (): DaoInfoCard[] => {
  const { t } = useTranslation()

  const { loadingTotalStakedValue, unstakingDuration } = useStakingInfo({
    fetchTotalStakedValue: true,
  })

  if (loadingTotalStakedValue === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const {
    collectionInfo: { symbol, totalSupply },
  } = useGovernanceCollectionInfo()

  return [
    {
      label: t('title.totalSupply'),
      tooltip: t('info.totalSupplyTooltip', {
        tokenSymbol: symbol,
      }),
      value: (
        <TokenAmountDisplay amount={totalSupply} decimals={0} symbol={symbol} />
      ),
    },
    {
      label: t('title.totalStaked'),
      tooltip: t('info.totalStakedTooltip', {
        tokenSymbol: symbol,
      }),
      value: loadingTotalStakedValue.loading
        ? '...'
        : formatPercentOf100(
            (loadingTotalStakedValue.data / totalSupply) * 100
          ),
    },
    {
      label: t('title.unstakingPeriod'),
      tooltip: t('info.unstakingPeriodTooltip', {
        tokenSymbol: symbol,
      }),
      value: unstakingDuration
        ? convertDurationToHumanReadableString(t, unstakingDuration)
        : t('info.none'),
    },
  ]
}
