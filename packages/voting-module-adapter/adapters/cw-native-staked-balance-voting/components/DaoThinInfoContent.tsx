import { UsersIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Pencil } from '@dao-dao/icons'
import { HorizontalInfo, HorizontalInfoSection } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { BaseDaoThinInfoContentProps } from '../../../types'
import { useGovernanceTokenInfo, useStakingInfo } from '../hooks'

export const DaoThinInfoContent = ({
  proposalCount,
}: BaseDaoThinInfoContentProps) => {
  const { t } = useTranslation()
  const { governanceTokenInfo } = useGovernanceTokenInfo()
  const { totalStakedValue } = useStakingInfo({
    fetchTotalStakedValue: true,
  })

  if (totalStakedValue === undefined) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="inline w-4" />
        {t('info.amountTotalStaked', {
          amount: convertMicroDenomToDenomWithDecimals(
            totalStakedValue,
            governanceTokenInfo.decimals
          ).toLocaleString(undefined, {
            maximumFractionDigits: governanceTokenInfo.decimals,
          }),
          tokenSymbol: governanceTokenInfo.symbol,
        })}
      </HorizontalInfoSection>
      <HorizontalInfoSection>
        <Pencil className="inline" fill="currentColor" />
        {t('info.proposalsCreated', { count: proposalCount })}
      </HorizontalInfoSection>
    </HorizontalInfo>
  )
}
