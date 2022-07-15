import { UsersIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Pencil } from '@dao-dao/icons'
import { useProposalModule, useVotingModule } from '@dao-dao/state'
import { HorizontalInfo, HorizontalInfoSection } from '@dao-dao/ui'

import { BaseDaoHorizontalInfoDisplayInternalProps } from '../../../types'

export const DaoHorizontalInfoDisplayInternal = ({
  coreAddress,
}: BaseDaoHorizontalInfoDisplayInternalProps) => {
  const { t } = useTranslation()
  const { totalVotingWeight, cw4VotingMembers } = useVotingModule(coreAddress, {
    fetchCw4VotingMembers: true,
  })
  const { proposalCount } = useProposalModule(coreAddress, {
    fetchProposalCount: true,
  })

  if (
    totalVotingWeight === undefined ||
    proposalCount === undefined ||
    !cw4VotingMembers
  ) {
    throw new Error('Failed to load data.')
  }

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="inline w-4" />
        {t('info.numMembers', { count: cw4VotingMembers.length })}
      </HorizontalInfoSection>
      <HorizontalInfoSection>
        <Pencil className="inline" fill="currentColor" />
        {t('info.proposalsCreated', { count: proposalCount })}
      </HorizontalInfoSection>
    </HorizontalInfo>
  )
}
