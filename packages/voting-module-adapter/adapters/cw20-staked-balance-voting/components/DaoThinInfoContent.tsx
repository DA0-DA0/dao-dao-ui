import { LibraryIcon, UsersIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Pencil } from '@dao-dao/icons'
import { useGovernanceTokenInfo, useVotingModule } from '@dao-dao/state'
import { HorizontalInfo, HorizontalInfoSection } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
} from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseDaoThinInfoContentProps } from '../../../types'

export const DaoThinInfoContent = ({
  proposalCount,
}: BaseDaoThinInfoContentProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  const { totalVotingWeight } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })

  if (!governanceTokenInfo || totalVotingWeight === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const totalGovernanceTokenSupply = Number(governanceTokenInfo.total_supply)

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="inline w-4" />
        {t('info.amountTotalSupply', {
          amount: convertMicroDenomToDenomWithDecimals(
            governanceTokenInfo.total_supply,
            governanceTokenInfo.decimals
          ).toLocaleString(undefined, {
            maximumFractionDigits: governanceTokenInfo.decimals,
          }),
          tokenSymbol: governanceTokenInfo.symbol,
        })}
      </HorizontalInfoSection>
      {totalGovernanceTokenSupply > 0 && (
        <HorizontalInfoSection>
          <LibraryIcon className="inline w-4" />
          {t('info.percentStaked', {
            percent: formatPercentOf100(
              (totalVotingWeight / totalGovernanceTokenSupply) * 100
            ),
            tokenSymbol: governanceTokenInfo.symbol,
          })}
        </HorizontalInfoSection>
      )}
      <HorizontalInfoSection>
        <Pencil className="inline" fill="currentColor" />
        {t('info.proposalsCreated', { count: proposalCount })}
      </HorizontalInfoSection>
    </HorizontalInfo>
  )
}
