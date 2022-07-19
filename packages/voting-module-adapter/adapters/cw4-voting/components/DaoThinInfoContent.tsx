import { UsersIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Pencil } from '@dao-dao/icons'
import { useCw4VotingModule, useVotingModule } from '@dao-dao/state'
import { HorizontalInfo, HorizontalInfoSection } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseDaoThinInfoContentProps } from '../../../types'

export const DaoThinInfoContent = ({
  proposalCount,
}: BaseDaoThinInfoContentProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { totalVotingWeight } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })

  if (totalVotingWeight === undefined || !members) {
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
