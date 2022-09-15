import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { AccountBalance, Link } from '@dao-dao/icons'
import { daoTvlSelector } from '@dao-dao/state'
import {
  CopyToClipboardUnderline,
  DaoInfoBarItem,
  DaoInfoBarLoader,
  DaoInfoBarProps,
  DaoInfoBar as StatelessDaoInfoBar,
} from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'
import { useVotingModuleAdapterOptions } from '@dao-dao/voting-module-adapter/react/context'

import { useDaoInfoContext } from './DaoPageWrapper'
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

  const treasuryUsdcValue = useRecoilValue(daoTvlSelector(coreAddress))

  const items: DaoInfoBarItem[] = useMemo(
    () => [
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
        value: t('format.token', {
          val: treasuryUsdcValue,
          tokenSymbol: 'USDC',
        }),
      },
      // Voting module-specific items.
      ...votingModuleItems,
    ],
    [t, coreAddress, treasuryUsdcValue, votingModuleItems]
  )

  return <StatelessDaoInfoBar items={items} {...props} />
}
