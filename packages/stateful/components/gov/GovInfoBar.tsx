import { useTranslation } from 'react-i18next'

import { communityPoolTvlSelector } from '@dao-dao/state'
import {
  DaoInfoCards,
  TokenAmountDisplay,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'

export const GovInfoBar = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  const treasuryUsdcValueLoading = useCachedLoading(
    communityPoolTvlSelector({
      chainId,
    }),
    {
      amount: -1,
      timestamp: new Date(),
    }
  )

  return (
    <DaoInfoCards
      cards={[
        {
          label: t('title.treasury'),
          tooltip: t('info.estimatedTreasuryUsdValueTooltip'),
          value: (
            <TokenAmountDisplay
              amount={
                treasuryUsdcValueLoading.loading
                  ? { loading: true }
                  : {
                      loading: false,
                      data: treasuryUsdcValueLoading.data.amount,
                    }
              }
              dateFetched={
                treasuryUsdcValueLoading.loading
                  ? undefined
                  : treasuryUsdcValueLoading.data.timestamp
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
