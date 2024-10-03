import { useTranslation } from 'react-i18next'

import { DaoInfoCards, useDao } from '@dao-dao/stateless'
import { formatDate } from '@dao-dao/utils'

export const MainDaoInfoCardsLoader = () => {
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
        {
          label: t('title.members'),
          tooltip: t('info.membersTooltip'),
          loading: true,
          value: undefined,
        },
      ]}
    />
  )
}
