import { useTranslation } from 'react-i18next'

import { DaoInfoCards, useDaoInfoContext } from '@dao-dao/stateless'
import { formatDate } from '@dao-dao/utils'

export const MainDaoInfoCardsLoader = () => {
  const { t } = useTranslation()
  const { activeThreshold, created } = useDaoInfoContext()

  return (
    <DaoInfoCards
      cards={[
        ...(created
          ? [
              {
                label: t('title.established'),
                tooltip: t('info.establishedTooltip'),
                value: formatDate(created),
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
          label: t('info.tokenStaked', {
            tokenSymbol: 'NTRN',
          }),
          tooltip: t('info.totalStakedTooltip', {
            tokenSymbol: 'NTRN',
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
