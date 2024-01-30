import { useTranslation } from 'react-i18next'

import { TokenAmountDisplay } from '@dao-dao/stateless'
import { DaoInfoCard } from '@dao-dao/types'
import {
  convertDurationToHumanReadableString,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'
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
    governanceTokenInfo: { decimals, symbol, total_supply },
  } = useGovernanceTokenInfo()

  return [
    {
      label: t('title.totalSupply'),
      tooltip: t('info.totalSupplyTooltip', {
        tokenSymbol: symbol,
      }),
      value: (
        <TokenAmountDisplay
          amount={convertMicroDenomToDenomWithDecimals(total_supply, decimals)}
          decimals={decimals}
          symbol={symbol}
        />
      ),
    },
    {
      label: t('title.totalStaked'),
      tooltip: t('info.totalStakedTooltip', {
        tokenSymbol: symbol,
      }),
      value: (
        <TokenAmountDisplay
          amount={
            loadingTotalStakedValue.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: convertMicroDenomToDenomWithDecimals(
                    loadingTotalStakedValue.data,
                    decimals
                  ),
                }
          }
          decimals={decimals}
          symbol={symbol}
        />
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
