import { UsersIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Pencil } from '@dao-dao/icons'
import {
  useCw4VotingModule,
  useProposalModule,
  useVotingModule,
} from '@dao-dao/state'
import { HorizontalInfo, HorizontalInfoSection } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const DaoHorizontalInfoDisplayInternal = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { totalVotingWeight } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })
  const { proposalCount } = useProposalModule(coreAddress, {
    fetchProposalCount: true,
  })

  if (
    totalVotingWeight === undefined ||
    proposalCount === undefined ||
    !members
  ) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="inline w-4" />
        {t('info.numMembers', { count: members.length })}
      </HorizontalInfoSection>
      <HorizontalInfoSection>
        <Pencil className="inline" fill="currentColor" />
        {t('info.proposalsCreated', { count: proposalCount })}
      </HorizontalInfoSection>
    </HorizontalInfo>
  )
}
