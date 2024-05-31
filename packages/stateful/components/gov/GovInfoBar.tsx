import { useTranslation } from 'react-i18next'

import { daoTvlSelector } from '@dao-dao/state'
import {
  DaoInfoCards,
  TokenAmountDisplay,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { COMMUNITY_POOL_ADDRESS_PLACEHOLDER } from '@dao-dao/utils'

export const GovInfoBar = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  const treasuryUsdValueLoading = useCachedLoading(
    daoTvlSelector({
      chainId,
      coreAddress: COMMUNITY_POOL_ADDRESS_PLACEHOLDER,
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
                treasuryUsdValueLoading.loading
                  ? { loading: true }
                  : {
                      loading: false,
                      data: treasuryUsdValueLoading.data.amount,
                    }
              }
              dateFetched={
                treasuryUsdValueLoading.loading
                  ? undefined
                  : treasuryUsdValueLoading.data.timestamp
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
