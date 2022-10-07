import { ComponentPropsWithoutRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoMemberCard, useDaoInfoContext } from '@dao-dao/common'
import { useEncodedProposalPrefill, useVotingModule } from '@dao-dao/state'
import { MembersTab as StatelessMembersTab } from '@dao-dao/ui'

import { makeManageMembersAction } from '../actions'
import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()

  const { isMember = false } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  const { totalVotingWeight } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })

  if (totalVotingWeight === undefined || !members) {
    throw new Error(t('error.loadingData'))
  }

  // Only make the action once.
  const [manageMembersAction] = useState(() => makeManageMembersAction())
  const encodedProposalPrefill = useEncodedProposalPrefill({
    actions: [
      {
        action: manageMembersAction,
        data: {
          toAdd: [{ addr: '', weight: NaN }],
          toRemove: [],
        },
      },
    ],
  })

  const memberCards: ComponentPropsWithoutRef<typeof DaoMemberCard>[] =
    members.map(({ addr, weight }) => ({
      address: addr,
      votingPowerPercent: (weight / totalVotingWeight) * 100,
    }))

  return (
    <StatelessMembersTab
      DaoMemberCard={DaoMemberCard}
      addMemberHref={
        encodedProposalPrefill &&
        `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefill}`
      }
      isMember={isMember}
      members={memberCards}
    />
  )
}
