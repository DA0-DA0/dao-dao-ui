import {
  AccountBalanceOutlined,
  LayersOutlined,
  LockOpenOutlined,
  PeopleAltOutlined,
} from '@mui/icons-material'
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
          Icon: AccountBalanceOutlined,
          label: t('title.daoTreasury'),
          tooltip: t('info.estimatedTreasuryUsdValueTooltip'),
          loading: true,
          value: undefined,
        },
        ...(activeThreshold
          ? [
              {
                Icon: LockOpenOutlined,
                label: t('title.activeThreshold'),
                tooltip: t('info.activeThresholdDescription'),
                loading: true,
                value: undefined,
              },
            ]
          : []),
        {
          Icon: PeopleAltOutlined,
          label: t('title.totalSupply'),
          loading: true,
          value: undefined,
        },
        {
          Icon: LayersOutlined,
          label: t('title.totalStaked'),
          loading: true,
          value: undefined,
        },
      ]}
    />
  )
}
