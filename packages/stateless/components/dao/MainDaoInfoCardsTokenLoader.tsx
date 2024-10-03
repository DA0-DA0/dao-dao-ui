import { useTranslation } from 'react-i18next'

import { formatDate } from '@dao-dao/utils'

import { useDao } from '../../contexts'
import { DaoInfoCards } from './DaoInfoCards'

/**
 * A common loader for the MainDaoInfoCards stateful component for token-based
 * voting module adapters.
 */
export const MainDaoInfoCardsTokenLoader = () => {
  const { t } = useTranslation()
  const { activeThreshold, created } = useDao().info

  return (
    <DaoInfoCards
      cards={[
        ...(created
          ? [
              {
                label: t('title.established'),
                tooltip: t('info.establishedTooltip'),
                value: formatDate(new Date(created)),
              },
            ]
          : []),
        {
          label: t('title.treasury'),
          tooltip: t('info.estimatedTreasuryUsdValueTooltip'),
          loading: true,
          value: undefined,
        },
        {
          label: t('title.members'),
          tooltip: t('info.membersTooltip'),
          loading: true,
          value: undefined,
        },
        {
          label: t('title.totalSupply'),
          tooltip: t('info.totalSupplyTooltip', {
            tokenSymbol: t('info.tokens'),
          }),
          loading: true,
          value: undefined,
        },
        {
          label: t('title.totalStaked'),
          tooltip: t('info.totalStakedTooltip', {
            tokenSymbol: t('info.tokens'),
          }),
          loading: true,
          value: undefined,
        },
        {
          label: t('title.unstakingPeriod'),
          tooltip: t('info.unstakingPeriodTooltip', {
            tokenSymbol: t('info.tokens'),
          }),
          loading: true,
          value: undefined,
        },
        ...(activeThreshold
          ? [
              {
                label: t('title.activeThreshold'),
                tooltip: t('info.activeThresholdDescription'),
                loading: true,
                value: undefined,
              },
            ]
          : []),
      ]}
    />
  )
}
