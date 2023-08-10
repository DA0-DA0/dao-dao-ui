import { AccountBalanceOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { communityPoolTvlSelector } from '@dao-dao/state'
import {
  DaoInfoBarLoader,
  DaoInfoBar as StatelessDaoInfoBar,
  TokenAmountDisplay,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'

import { SuspenseLoader } from '../SuspenseLoader'

export const GovInfoBar = () => (
  <SuspenseLoader fallback={<DaoInfoBarLoader />}>
    <InnerGovInfoBar />
  </SuspenseLoader>
)

const InnerGovInfoBar = () => {
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
    <StatelessDaoInfoBar
      items={[
        // Common items.
        {
          Icon: AccountBalanceOutlined,
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
