import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { TokenAmountDisplay } from '@dao-dao/stateless'
import { DaoInfoCard } from '@dao-dao/types'

import { useVotingModule } from './useVotingModule'

export const useMainDaoInfoCards = (): DaoInfoCard[] => {
  const { t } = useTranslation()

  const { loadingVaults } = useVotingModule()

  return loadingVaults.loading || loadingVaults.errored
    ? []
    : loadingVaults.data.flatMap(({ info, totalPower }) =>
        info.real
          ? {
              label: t('info.tokenStaked', {
                tokenSymbol: info.bondToken.symbol,
              }),
              tooltip: t('info.totalStakedTooltip', {
                tokenSymbol: info.bondToken.symbol,
              }),
              value: (
                <TokenAmountDisplay
                  amount={HugeDecimal.from(totalPower).toHumanReadableNumber(
                    info.bondToken.decimals
                  )}
                  decimals={info.bondToken.decimals}
                  symbol={info.bondToken.symbol}
                />
              ),
            }
          : []
      )
}
