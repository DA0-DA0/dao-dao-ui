import { LayersOutlined, PeopleAltOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { DaoInfoBarItem, TokenAmountDisplay } from '@dao-dao/stateless'
import { formatPercentOf100 } from '@dao-dao/utils'

import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'
import { useStakingInfo } from './useStakingInfo'

export const useDaoInfoBarItems = (): DaoInfoBarItem[] => {
  const { t } = useTranslation()

  const { totalStakedValue } = useStakingInfo({
    fetchTotalStakedValue: true,
  })

  if (totalStakedValue === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const {
    governanceTokenInfo: { symbol, total_supply },
  } = useGovernanceTokenInfo()

  return [
    {
      Icon: PeopleAltOutlined,
      label: t('title.totalSupply'),
      value: (
        <TokenAmountDisplay
          amount={Number(total_supply)}
          decimals={0}
          symbol={symbol}
        />
      ),
    },
    {
      Icon: LayersOutlined,
      label: t('title.totalStaked'),
      value: formatPercentOf100(
        (totalStakedValue / Number(total_supply)) * 100
      ),
    },
  ]
}
