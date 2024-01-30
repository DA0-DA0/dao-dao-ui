import { useTranslation } from 'react-i18next'

import { DaoInfoCards, useDaoInfoContext } from '@dao-dao/stateless'

export const MainDaoInfoCardsLoader = () => {
  const { t } = useTranslation()
  const { activeThreshold } = useDaoInfoContext()

  return (
    <DaoInfoCards
      cards={[
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
