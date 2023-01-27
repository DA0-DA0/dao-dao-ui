import { AccountBalanceOutlined, Link } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { daoTvlSelector } from '@dao-dao/state'
import {
  CopyToClipboardUnderline,
  DaoInfoBarLoader,
  DaoInfoBar as StatelessDaoInfoBar,
  TokenAmountDisplay,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { loadableToLoadingData } from '@dao-dao/utils'

import {
  useCw20GovernanceTokenInfoResponseIfExists,
  useVotingModuleAdapter,
} from '../../voting-module-adapter'
import { SuspenseLoader } from '../SuspenseLoader'

export const DaoInfoBar = () => (
  <SuspenseLoader fallback={<DaoInfoBarLoader />}>
    <InnerDaoInfoBar />
  </SuspenseLoader>
)

const InnerDaoInfoBar = () => {
  const { t } = useTranslation()
  const {
    hooks: { useDaoInfoBarItems },
  } = useVotingModuleAdapter()
  const votingModuleItems = useDaoInfoBarItems()
  const { chainId, coreAddress } = useDaoInfoContext()

  const { governanceTokenAddress: cw20GovernanceTokenAddress } =
    useCw20GovernanceTokenInfoResponseIfExists() ?? {}

  const treasuryUsdcValueLoading = loadableToLoadingData(
    useCachedLoadable(
      daoTvlSelector({
        coreAddress,
        chainId,
        cw20GovernanceTokenAddress,
      })
    ),
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
          Icon: Link,
          label: t('title.daosAddress'),
          value: (
            <CopyToClipboardUnderline
              // Inherit color and font size from parent.
              className="text-[1em] text-inherit"
              takeStartEnd={{
                start: 6,
                end: 4,
              }}
              value={coreAddress}
            />
          ),
        },
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
        // Voting module-specific items.
        ...votingModuleItems,
      ]}
    />
  )
}
