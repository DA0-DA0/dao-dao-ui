import { LayersOutlined, PeopleAltOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { useVotingModule } from '@dao-dao/state'
import { DaoInfoBarItem, Tooltip } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
} from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'

export const useDaoInfoBarItems = (): DaoInfoBarItem[] => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { totalVotingWeight } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })

  if (totalVotingWeight === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const {
    governanceTokenInfo: { decimals, symbol, total_supply },
  } = useGovernanceTokenInfo()

  const macroTotalSupply = convertMicroDenomToDenomWithDecimals(
    total_supply,
    decimals
  )

  return [
    {
      Icon: PeopleAltOutlined,
      label: t('title.totalSupply'),
      value: (
        <Tooltip
          title={`${macroTotalSupply.toLocaleString(undefined, {
            maximumFractionDigits: decimals,
          })} $${symbol}`}
        >
          <p>
            {macroTotalSupply.toLocaleString(undefined, {
              notation: 'compact',
              maximumFractionDigits: decimals,
            })}{' '}
            ${symbol}
          </p>
        </Tooltip>
      ),
    },
    {
      Icon: LayersOutlined,
      label: t('title.totalStaked'),
      value: formatPercentOf100(
        (totalVotingWeight / Number(total_supply)) * 100
      ),
    },
  ]
}
