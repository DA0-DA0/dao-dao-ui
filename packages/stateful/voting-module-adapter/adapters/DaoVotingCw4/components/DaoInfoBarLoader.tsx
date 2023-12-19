import {
  AccountBalanceOutlined,
  LockOpenOutlined,
  PeopleAltOutlined,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { DaoInfoBar, useDaoInfoContext } from '@dao-dao/stateless'

export const DaoInfoBarLoader = () => {
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
          label: t('title.members'),
          loading: true,
          value: undefined,
        },
      ]}
    />
  )
}
