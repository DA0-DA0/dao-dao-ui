import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '../../hooks'
import { DaoInfoBar } from './DaoInfoBar'

export const DaoInfoBarTokenLoader = () => {
  const { t } = useTranslation()
  const { activeThreshold } = useDaoInfoContext()

  return (
    <DaoInfoBar
      items={[
        {
          label: t('title.daoTreasury'),
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
      ]}
    />
  )
}
