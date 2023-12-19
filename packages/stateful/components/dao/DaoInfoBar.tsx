import { AccountBalanceOutlined, LockOpenOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { daoTvlSelector } from '@dao-dao/state'
import {
  DaoInfoBar as StatelessDaoInfoBar,
  TokenAmountDisplay,
  useCachedLoading,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
} from '@dao-dao/utils'

import {
  useCw20CommonGovernanceTokenInfoIfExists,
  useVotingModuleAdapter,
} from '../../voting-module-adapter'
import { SuspenseLoader } from '../SuspenseLoader'

export const DaoInfoBar = () => {
  const {
    components: { DaoInfoBarLoader },
  } = useVotingModuleAdapter()

  return (
    <SuspenseLoader fallback={<DaoInfoBarLoader />}>
      <InnerDaoInfoBar />
    </SuspenseLoader>
  )
}

const InnerDaoInfoBar = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const {
    hooks: { useDaoInfoBarItems, useCommonGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const votingModuleItems = useDaoInfoBarItems()
  const { coreAddress, activeThreshold } = useDaoInfoContext()

  const { denomOrAddress: cw20GovernanceTokenAddress } =
    useCw20CommonGovernanceTokenInfoIfExists() ?? {}
  const tokenInfo = useCommonGovernanceTokenInfo?.()

  const treasuryUsdcValueLoading = useCachedLoading(
    daoTvlSelector({
      coreAddress,
      chainId,
      cw20GovernanceTokenAddress,
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
          label: t('title.daoTreasury'),
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
        ...(activeThreshold
          ? [
              {
                Icon: LockOpenOutlined,
                label: t('title.activeThreshold'),
                tooltip: t('info.activeThresholdDescription'),
                value:
                  'percentage' in activeThreshold
                    ? formatPercentOf100(
                        Number(activeThreshold.percentage.percent) * 100
                      )
                    : tokenInfo && (
                        <TokenAmountDisplay
                          amount={convertMicroDenomToDenomWithDecimals(
                            activeThreshold.absolute_count.count,
                            tokenInfo.decimals
                          )}
                          decimals={tokenInfo.decimals}
                          symbol={tokenInfo.symbol}
                        />
                      ),
              },
            ]
          : []),
        // Voting module-specific items.
        ...votingModuleItems,
      ]}
    />
  )
}
