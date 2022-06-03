import { LibraryIcon, UsersIcon } from '@heroicons/react/outline'
import { FC } from 'react'

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
  convertMicroDenomToDenomWithDecimals,
  VotingModuleType,
} from '@dao-dao/utils'

import { useOrgInfoContext } from './OrgPageWrapper'

const DaoHorizontalInfoDisplayInternal: FC = () => {
  const { coreAddress, votingModuleType } = useOrgInfoContext()
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
          `${cw4VotingMembers.length} members`
        ) : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
          governanceTokenInfo ? (
          <>
            {convertMicroDenomToDenomWithDecimals(
              governanceTokenInfo.total_supply,
              governanceTokenInfo.decimals
            ).toLocaleString()}{' '}
            ${governanceTokenInfo.symbol} total supply
          </>
        ) : null}
      </HorizontalInfoSection>
      {votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
        governanceTokenInfo &&
        stakedPercent !== undefined && (
          <HorizontalInfoSection>
            <LibraryIcon className="inline w-4" />
            {stakedPercent}% ${governanceTokenInfo.symbol} staked
          </HorizontalInfoSection>
        )}
      <HorizontalInfoSection>
        <Pencil className="inline" fill="currentColor" />
        {proposalCount} proposals created
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
