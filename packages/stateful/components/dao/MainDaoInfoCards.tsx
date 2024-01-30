import { useTranslation } from 'react-i18next'

import { daoTvlSelector } from '@dao-dao/state'
import {
  DaoInfoCards as StatelessDaoInfoCards,
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

export const MainDaoInfoCards = () => {
  const {
    components: { MainDaoInfoCardsLoader },
  } = useVotingModuleAdapter()

  return (
    <SuspenseLoader fallback={<MainDaoInfoCardsLoader />}>
      <InnerMainDaoInfoCards />
    </SuspenseLoader>
  )
}

const InnerMainDaoInfoCards = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const {
    hooks: { useMainDaoInfoCards, useCommonGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const votingModuleCards = useMainDaoInfoCards()
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
    <StatelessDaoInfoCards
      cards={[
        // Common items.
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
        // Voting module-specific cards.
        ...votingModuleCards,
        // Put active threshold last so it's closer to voting module cards which
        // may contain staking information.
        ...(activeThreshold
          ? [
              {
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
      ]}
    />
  )
}
