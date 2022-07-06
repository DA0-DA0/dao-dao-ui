import { LibraryIcon, UsersIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Pencil } from '@dao-dao/icons'
import {
  useGovernanceTokenInfo,
  useProposalModule,
  useVotingModule,
} from '@dao-dao/state'
import {
  HorizontalInfo,
  HorizontalInfoSection,
  SuspenseLoader,
} from '@dao-dao/ui'
import {
  VotingModuleType,
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
} from '@dao-dao/utils'

import { useDAOInfoContext } from './DAOPageWrapper'

const DaoHorizontalInfoDisplayInternal: FC = () => {
  const { t } = useTranslation()
  const { coreAddress, votingModuleType } = useDAOInfoContext()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  const { totalVotingWeight, cw4VotingMembers } = useVotingModule(coreAddress, {
    fetchCw4VotingMembers: votingModuleType === VotingModuleType.Cw4Voting,
  })
  const { proposalCount } = useProposalModule(coreAddress, {
    fetchProposalCount: true,
  })

  if (totalVotingWeight === undefined || proposalCount === undefined) {
    throw new Error('Failed to load data.')
  }

  const stakedPercent =
    votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
    totalVotingWeight !== undefined &&
    governanceTokenInfo &&
    Number(governanceTokenInfo.total_supply) > 0
      ? formatPercentOf100(
          (totalVotingWeight / Number(governanceTokenInfo.total_supply)) * 100
        )
      : undefined

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="inline w-4" />
        {votingModuleType === VotingModuleType.Cw4Voting && cw4VotingMembers ? (
          `${cw4VotingMembers.length} member${
            cw4VotingMembers.length !== 1 ? 's' : ''
          }`
        ) : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
          governanceTokenInfo ? (
          <>
            {t('info.amountTotalSupply', {
              amount: convertMicroDenomToDenomWithDecimals(
                governanceTokenInfo.total_supply,
                governanceTokenInfo.decimals
              ).toLocaleString(undefined, {
                maximumFractionDigits: governanceTokenInfo.decimals,
              }),
              tokenSymbol: governanceTokenInfo.symbol,
            })}
          </>
        ) : null}
      </HorizontalInfoSection>
      {votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
        governanceTokenInfo &&
        stakedPercent !== undefined && (
          <HorizontalInfoSection>
            <LibraryIcon className="inline w-4" />
            {t('info.percentStaked', {
              percent: stakedPercent,
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

export const HorizontalInfoDisplayLoader: FC = () => (
  <HorizontalInfo>
    <HorizontalInfoSection>
      <></>
    </HorizontalInfoSection>
  </HorizontalInfo>
)

export const DaoHorizontalInfoDisplay: FC = () => (
  <SuspenseLoader fallback={<HorizontalInfoDisplayLoader />}>
    <DaoHorizontalInfoDisplayInternal />
  </SuspenseLoader>
)
