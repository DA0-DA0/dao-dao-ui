import { useTranslation } from 'react-i18next'

import { AccountBalance, Link } from '@dao-dao/icons'
import { daoTvlSelector, useCachedLoadable } from '@dao-dao/state'
import {
  CopyToClipboardUnderline,
  DaoInfoBarLoader,
  DaoInfoBarProps,
  DaoInfoBar as StatelessDaoInfoBar,
  Tooltip,
  useDaoInfoContext,
} from '@dao-dao/ui'
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

  const treasuryUsdcValueLoadable = useCachedLoadable(
    daoTvlSelector(coreAddress)
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
          value:
            treasuryUsdcValueLoadable.state !== 'hasValue' ? (
              `... $USDC`
            ) : (
              <Tooltip
                title={t('format.token', {
                  amount: treasuryUsdcValueLoadable.contents.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 3,
                    }
                  ),
                  symbol: 'USDC',
                })}
              >
                <p>
                  {t('format.token', {
                    amount: treasuryUsdcValueLoadable.contents.toLocaleString(
                      undefined,
                      {
                        notation: 'compact',
                        maximumFractionDigits: 3,
                      }
                    ),
                    symbol: 'USDC',
                  })}
                </p>
              </Tooltip>
            ),
        },
        // Voting module-specific items.
        ...votingModuleItems,
      ]}
      {...props}
    />
  )
}
