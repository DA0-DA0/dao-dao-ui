import { LibraryIcon, UsersIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Pencil } from '@dao-dao/icons'
import {
  useGovernanceTokenInfo,
  useProposalModule,
  useVotingModule,
} from '@dao-dao/state'
import { HorizontalInfo, HorizontalInfoSection } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
} from '@dao-dao/utils'

import { BaseDaoHorizontalInfoDisplayInternalProps } from '../../../types'

export const DaoHorizontalInfoDisplayInternal = ({
  coreAddress,
}: BaseDaoHorizontalInfoDisplayInternalProps) => {
  const { t } = useTranslation()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  const { totalVotingWeight } = useVotingModule(coreAddress)
  const { proposalCount } = useProposalModule(coreAddress, {
    fetchProposalCount: true,
  })

  if (
    !governanceTokenInfo ||
    totalVotingWeight === undefined ||
    proposalCount === undefined
  ) {
    throw new Error('Failed to load data.')
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
