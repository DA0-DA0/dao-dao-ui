import { useTranslation } from 'react-i18next'

import { TokenAmountDisplay } from '@dao-dao/stateless'
import { DaoInfoBarItem } from '@dao-dao/types'
import {
  convertDurationToHumanReadableString,
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
} from '@dao-dao/utils'

import { useMembership } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'
import { useStakingInfo } from './useStakingInfo'

export const useDaoInfoBarItems = (): DaoInfoBarItem[] => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { totalVotingWeight } = useMembership({
    coreAddress,
  })

  const { unstakingDuration } = useStakingInfo()

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
      loading: totalVotingWeight === undefined,
      value:
        totalVotingWeight === undefined
          ? undefined
          : formatPercentOf100(
              (totalVotingWeight / Number(total_supply)) * 100
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
