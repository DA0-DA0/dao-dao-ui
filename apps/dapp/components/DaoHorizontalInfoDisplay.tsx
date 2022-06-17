import { LibraryIcon, UsersIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'
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
} from '@dao-dao/utils'

import { useDAOInfoContext } from './DAOPageWrapper'

const DaoHorizontalInfoDisplayInternal: FC = () => {
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
      ? (
          (100 * totalVotingWeight) /
          Number(governanceTokenInfo.total_supply)
        ).toLocaleString(undefined, { maximumSignificantDigits: 3 })
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
            {i18n.t('Total supply amount', {
              amount: convertMicroDenomToDenomWithDecimals(
                governanceTokenInfo.total_supply,
                governanceTokenInfo.decimals
              ).toLocaleString(),
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
            {i18n.t('Percent staked', {
              percent: stakedPercent,
              tokenSymbol: governanceTokenInfo.symbol,
            })}
          </HorizontalInfoSection>
        )}
      <HorizontalInfoSection>
        <Pencil className="inline" fill="currentColor" />
        {i18n.t('Proposals created', { proposalCount })}
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
