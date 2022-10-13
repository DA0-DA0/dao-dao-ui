import { useTranslation } from 'react-i18next'

import { AccountBalance, Link } from '@dao-dao/icons'
import { daoTvlSelector, useCachedLoadable } from '@dao-dao/state'
import {
  CopyToClipboardUnderline,
  DaoInfoBarLoader,
  DaoInfoBarProps,
  DaoInfoBar as StatelessDaoInfoBar,
  TokenAmountDisplay,
  useDaoInfoContext,
} from '@dao-dao/ui'
import { loadableToLoadingData } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'
import { useVotingModuleAdapterOptions } from '@dao-dao/voting-module-adapter/react/context'

import { SuspenseLoader } from './SuspenseLoader'

export const DaoInfoBar = (props: InnerDaoInfoBarProps) => {
  const { Loader } = useVotingModuleAdapterOptions()

  return (
    <SuspenseLoader fallback={<DaoInfoBarLoader Loader={Loader} />}>
      <InnerDaoInfoBar {...props} />
    </SuspenseLoader>
  )
}

type InnerDaoInfoBarProps = Omit<DaoInfoBarProps, 'items'>

const InnerDaoInfoBar = (props: InnerDaoInfoBarProps) => {
  const { t } = useTranslation()
  const {
    hooks: { useDaoInfoBarItems },
  } = useVotingModuleAdapter()
  const votingModuleItems = useDaoInfoBarItems()
  const { coreAddress } = useDaoInfoContext()

  const treasuryUsdcValueLoading = loadableToLoadingData(
    useCachedLoadable(daoTvlSelector(coreAddress)),
    -1
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
          Icon: AccountBalance,
          label: t('title.daoTreasury'),
          value: <TokenAmountDisplay amount={treasuryUsdcValueLoading} usdc />,
        },
        // Voting module-specific items.
        ...votingModuleItems,
      ]}
      {...props}
    />
  )
}
